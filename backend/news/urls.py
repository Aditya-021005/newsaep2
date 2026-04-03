from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ContactMessageViewSet, MemberViewSet, IssueViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'members', MemberViewSet)
router.register(r'issues', IssueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]