from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ContactMessageViewSet, MemberViewSet, IssueViewSet, proxy_pdf

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'members', MemberViewSet, basename='member')
router.register(r'issues', IssueViewSet, basename='issue')

urlpatterns = [
    path('proxy-pdf/', proxy_pdf, name='proxy-pdf'),
    path('', include(router.urls)),
]