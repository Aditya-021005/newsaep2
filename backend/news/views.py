from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Article, ContactMessage, Member, Issue
from .serializers import ArticleSerializer, ContactMessageSerializer, MemberSerializer, IssueSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-published_date')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary', 'category']
    filterset_fields = ['category', 'event_category', 'event_year']
    ordering_fields = ['published_date', 'title']

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all().order_by('-event_year', '-published_date')
    serializer_class = IssueSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['event_category', 'event_year']
    search_fields = ['title']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'message']

from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import requests

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
    
    # If the URL is relative, convert it to an absolute one using host's URI
    if target_url.startswith('/'):
        target_url = request.build_absolute_uri(target_url)
    elif not target_url.startswith('http'):
        # Just in case some paths are weirdly formatted
        target_url = request.build_absolute_uri('/' + target_url)

    try:
        # Fetch the PDF
        # We also need to handle cases where the internal file might require a host mapping
        # but build_absolute_uri should have solved it.
        response = requests.get(target_url, stream=True, timeout=15)
        response.raise_for_status()
        
        # Stream the response back to the client
        proxy_response = StreamingHttpResponse(
            response.iter_content(chunk_size=8192),
            content_type=response.headers.get('Content-Type', 'application/pdf')
        )
        
        # Simple headers to ensure it displays correctly and allows CORS
        proxy_response['Access-Control-Allow-Origin'] = '*'
        proxy_response['Content-Disposition'] = response.headers.get('Content-Disposition', 'inline')
        # Ensure it doesn't block iframed viewing
        proxy_response['X-Frame-Options'] = 'ALLOWALL'
        
        return proxy_response
        
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Failed to fetch PDF: {str(e)}'}, status=502)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('year', 'name')
    serializer_class = MemberSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'year', 'role']