from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse, FileResponse
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import os
import requests
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Article, ContactMessage, Member, Issue
from .serializers import ArticleSerializer, ContactMessageSerializer, MemberSerializer, IssueSerializer

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
            response['Cache-Control'] = 'public, max-age=86400'  # Cache for 1 day
            return response

    # Fallback to HTTP proxying for relative paths and external URLs (e.g. Cloudinary)
    if target_url.startswith('/'):
        target_url = request.build_absolute_uri(target_url)
    elif not target_url.startswith('http'):
        target_url = request.build_absolute_uri('/' + target_url)

    try:
        # Use shorter timeout (5s instead of 15s) for external requests
        response = requests.get(target_url, stream=True, timeout=5)
        response.raise_for_status()
        
        proxy_response = StreamingHttpResponse(
            response.iter_content(chunk_size=16384),  # Larger chunks for faster transfer
            content_type=response.headers.get('Content-Type', 'application/pdf')
        )
        
        proxy_response['Access-Control-Allow-Origin'] = '*'
        proxy_response['Content-Disposition'] = response.headers.get('Content-Disposition', 'inline')
        proxy_response['X-Frame-Options'] = 'ALLOWALL'
        proxy_response['Cache-Control'] = 'public, max-age=86400'  # Cache for 1 day
        
        return proxy_response
    except requests.exceptions.Timeout:
        return JsonResponse({'error': 'PDF request timeout'}, status=504)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Failed to fetch PDF: {str(e)}'}, status=502)

class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'year', 'role']
    
    def get_queryset(self):
        return Member.objects.order_by('year', 'name')