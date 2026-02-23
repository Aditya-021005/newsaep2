from django.contrib import admin
from .models import Article, ContactMessage

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_date')
    list_filter = ('category', 'published_date')
    search_fields = ('title', 'content', 'summary')
    ordering = ('-published_date',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
