from rest_framework import viewsets
from .models import Article, ContactMessage
from .serializers import ArticleSerializer, ContactMessageSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-published_date')
    serializer_serializer = ArticleSerializer
    
    # Simple fix for serializer_class vs serializer_serializer typo
    def get_serializer_class(self):
        return ArticleSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
