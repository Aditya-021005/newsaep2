from rest_framework import viewsets, filters
from .models import Article, ContactMessage
from .serializers import ArticleSerializer, ContactMessageSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-published_date')
    serializer_class = ArticleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary', 'category']
    ordering_fields = ['published_date', 'title']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'message']
