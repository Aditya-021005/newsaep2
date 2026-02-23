from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ContactMessageViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
