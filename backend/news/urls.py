from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ContactMessageViewSet, MemberViewSet
router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'members', MemberViewSet)
urlpatterns = [
    path('', include(router.urls)),
]