from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse, FileResponse
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import os
import requests
from rest_framework import viewsets, filters, status
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
    
    if hasattr(settings, 'GOOGLE_DRIVE_API_KEY') and settings.GOOGLE_DRIVE_API_KEY:
        import re
        file_id_match = re.search(r'id=([0-9A-Za-z_-]+)', url)
        if not file_id_match:
            file_id_match = re.search(r'/file/d/([0-9A-Za-z_-]+)', url)
        if file_id_match:
            file_id = file_id_match.group(1)
            api_url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key={settings.GOOGLE_DRIVE_API_KEY}"
            return session.get(api_url, headers=headers, stream=True, timeout=30)
    
    response = session.get(url, headers=headers, stream=True, timeout=15)
    return response

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary', 'category']
    filterset_fields = ['category', 'event_category', 'event_year']
    ordering_fields = ['published_date', 'title']
    
    def get_queryset(self):
        return Article.objects.prefetch_related('images').order_by('-published_date')

class IssueViewSet(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['event_category', 'event_year']
    search_fields = ['title']
    
    def get_queryset(self):
        return Issue.objects.order_by('-event_year', '-published_date')

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'message']

@api_view(['GET'])
@permission_classes([AllowAny])
@xframe_options_exempt
def proxy_pdf(request):
    target_url = request.query_params.get('url')
    if not target_url:
        return JsonResponse({'error': 'No URL provided'}, status=400)
    
    if target_url.startswith(settings.MEDIA_URL):
        relative_path = target_url[len(settings.MEDIA_URL):]
        file_path = os.path.normpath(os.path.join(settings.MEDIA_ROOT, relative_path))
        if os.path.exists(file_path):
            response = FileResponse(open(file_path, 'rb'), content_type='application/pdf')
            response['Access-Control-Allow-Origin'] = '*'
            response['Content-Disposition'] = 'inline'
            response['X-Frame-Options'] = 'ALLOWALL'
            return response

    if target_url.startswith('/'):
        target_url = request.build_absolute_uri(target_url)
    elif not target_url.startswith('http'):
        target_url = request.build_absolute_uri('/' + target_url)

    if 'drive.google.com' in target_url and '/file/d/' in target_url:
        import re
        match = re.search(r'/file/d/([^/]+)', target_url)
        if match:
            file_id = match.group(1)
            target_url = f"https://drive.google.com/uc?id={file_id}&export=download"

    try:
        if 'drive.google.com' in target_url:
            response = get_google_drive_stream(target_url)
        else:
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(target_url, stream=True, timeout=15, headers=headers)
        
        response.raise_for_status()
        proxy_response = StreamingHttpResponse(
            response.iter_content(chunk_size=262144),
            content_type=response.headers.get('Content-Type', 'application/pdf')
        )
        proxy_response['Access-Control-Allow-Origin'] = '*'
        proxy_response['X-Frame-Options'] = 'ALLOWALL'
        return proxy_response
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=502)

class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'year', 'role']
    
    def get_queryset(self):
        return Member.objects.order_by('-year', 'name')