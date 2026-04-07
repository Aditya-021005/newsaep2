from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse, FileResponse
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import os
import requests
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Article, ContactMessage, Member, Issue
from .serializers import ArticleSerializer, ContactMessageSerializer, MemberSerializer, IssueSerializer

def get_google_drive_stream(url):
    """
    High-resiliency downloader for Google Drive to bypass Sign-In screens
    and 'too large to scan' warnings.
    """
    session = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # --- Option B: If we have an API Key, use the official API endpoint ---
    if hasattr(settings, 'GOOGLE_DRIVE_API_KEY') and settings.GOOGLE_DRIVE_API_KEY:
        import re
        file_id_match = re.search(r'id=([0-9A-Za-z_-]+)', url)
        if not file_id_match:
            file_id_match = re.search(r'/file/d/([0-9A-Za-z_-]+)', url)
            
        if file_id_match:
            file_id = file_id_match.group(1)
            api_url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key={settings.GOOGLE_DRIVE_API_KEY}"
            return session.get(api_url, headers=headers, stream=True, timeout=30)
    
    # --- Option A: Browser-spoofing and token extraction (Fallback) ---
    # 1. First attempt to get the download (Google might show a warning page)
    response = session.get(url, headers=headers, stream=True, timeout=15)
    
    # 2. Check if we have a confirmation token in cookies
    confirm_token = None
    for key, value in session.cookies.items():
        if key.startswith('download_warning'):
            confirm_token = value
            break
            
    # 3. If no cookie, check the HTML body for the confirm token (common for large files)
    if not confirm_token:
        try:
            # We need to read a bit of the content to find the token
            # But not too much to avoid memory issues with large PDFs
            # Google's warning page is small HTML
            content_snippet = response.content.decode('utf-8', errors='ignore')
            import re
            match = re.search(r'confirm=([0-9A-Za-z_]+)', content_snippet)
            if match:
                confirm_token = match.group(1)
        except Exception:
            pass

    if confirm_token:
        # Re-request with the confirmation token
        url = f"{url}&confirm={confirm_token}"
        return session.get(url, headers=headers, stream=True, timeout=30)
        
    return response

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary', 'category']
    filterset_fields = ['category', 'event_category', 'event_year']
    ordering_fields = ['published_date', 'title']
    
    def get_queryset(self):
        # Optimize queries with select_related and prefetch_related
        return Article.objects.prefetch_related('images').order_by('-published_date')

class IssueViewSet(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['event_category', 'event_year']
    search_fields = ['title']
    
    def get_queryset(self):
        # Optimize queries
        return Issue.objects.order_by('-event_year', '-published_date')

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'message']



@api_view(['GET'])
@permission_classes([AllowAny])
@method_decorator(cache_page(60 * 60), name='dispatch')
@xframe_options_exempt
def proxy_pdf(request):
    """
    Proxies a PDF from a remote OR local URL to bypass CORS.
    Usage: /api/proxy-pdf/?url=/media/issues/pdfs/file.pdf
    """
    target_url = request.query_params.get('url')
    if not target_url:
        return JsonResponse({'error': 'No URL provided'}, status=400)
    
    # Path optimization: If it's a local media file, serve it directly from filesystem
    if target_url.startswith(settings.MEDIA_URL):
        relative_path = target_url[len(settings.MEDIA_URL):]
        file_path = os.path.normpath(os.path.join(settings.MEDIA_ROOT, relative_path))
        
        # Security: Prevent path traversal
        abs_media_root = os.path.abspath(settings.MEDIA_ROOT)
        abs_file_path = os.path.abspath(file_path)
        
        if abs_file_path.startswith(abs_media_root) and os.path.exists(abs_file_path):
            response = FileResponse(open(abs_file_path, 'rb'), content_type='application/pdf')
            response['Access-Control-Allow-Origin'] = '*'
            response['Content-Disposition'] = 'inline'
            response['X-Frame-Options'] = 'ALLOWALL'
            response['Cache-Control'] = 'public, max-age=86400'
            return response
            
        # If it doesn't exist at the exact path, try a recursive-style search for the basename
        # This handles cases where Django storage might have nested the file unexpectedly
        filename = os.path.basename(relative_path)
        for root, dirs, files in os.walk(settings.MEDIA_ROOT):
            if filename in files:
                found_path = os.path.join(root, filename)
                response = FileResponse(open(found_path, 'rb'), content_type='application/pdf')
                response['Access-Control-Allow-Origin'] = '*'
                response['Content-Disposition'] = 'inline'
                response['X-Frame-Options'] = 'ALLOWALL'
                return response

    # Fallback to HTTP proxying for relative paths and external URLs (e.g. Google Drive)
    if target_url.startswith('/'):
        target_url = request.build_absolute_uri(target_url)
    elif not target_url.startswith('http'):
        target_url = request.build_absolute_uri('/' + target_url)

    # Google Drive Fix: Automatically convert "view" links to "download" links
    if 'drive.google.com' in target_url and '/file/d/' in target_url:
        import re
        match = re.search(r'/file/d/([^/]+)', target_url)
        if match:
            file_id = match.group(1)
            target_url = f"https://drive.google.com/uc?id={file_id}&export=download"

    try:
        # Use a browser-like User-Agent to prevent 401/403 errors from Google Drive
        if 'drive.google.com' in target_url:
            response = get_google_drive_stream(target_url)
        else:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(target_url, stream=True, timeout=15, headers=headers, allow_redirects=True)
            
        response.raise_for_status()
        
        proxy_response = StreamingHttpResponse(
            response.iter_content(chunk_size=262144),  # 256KB chunks for faster transfer
            content_type=response.headers.get('Content-Type', 'application/pdf')
        )
        
        proxy_response['Access-Control-Allow-Origin'] = '*'
        proxy_response['Content-Disposition'] = response.headers.get('Content-Disposition', 'inline')
        proxy_response['X-Frame-Options'] = 'ALLOWALL'
        proxy_response['Cache-Control'] = 'public, max-age=86400'
        
        return proxy_response
    except requests.exceptions.Timeout:
        return JsonResponse({'error': 'PDF request timeout'}, status=504)
    except requests.exceptions.RequestException as e:
        status_code = getattr(e.response, 'status_code', 502) if hasattr(e, 'response') else 502
        return JsonResponse({'error': f'Failed to fetch PDF ({status_code}): {str(e)}'}, status=status_code)

class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'year', 'role']
    
    def get_queryset(self):
        return Member.objects.order_by('year', 'name')