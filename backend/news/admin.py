from django.contrib import admin
from .models import Article, ContactMessage
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_date', 'has_image_file')
    list_filter = ('category', 'published_date')
    search_fields = ('title', 'content', 'summary')
    ordering = ('-published_date',)
    def has_image_file(self, obj):
        return bool(obj.image_file)
    has_image_file.boolean = True
    has_image_file.short_description = 'Uploaded'
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)