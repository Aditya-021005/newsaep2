from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Article, ContactMessage, Member
from .serializers import ArticleSerializer, ContactMessageSerializer, MemberSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-published_date')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary', 'category']
    filterset_fields = ['category']
    ordering_fields = ['published_date', 'title']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'message']

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('year', 'name')
    serializer_class = MemberSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'year', 'role']
