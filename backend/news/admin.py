from django.contrib import admin
from .models import Article, ContactMessage, ArticleImage, Issue

class ArticleImageInline(admin.TabularInline):
    model = ArticleImage
    extra = 1

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_hero', 'event_category', 'event_year', 'category', 'published_date', 'has_image_file')
    list_filter = ('is_hero', 'event_category', 'event_year', 'category', 'published_date')
    search_fields = ('title', 'content', 'summary')
    ordering = ('-published_date',)
    inlines = [ArticleImageInline]

    def has_image_file(self, obj):
        return bool(obj.image_file) or obj.images.exists()
    
    has_image_file.boolean = True
    has_image_file.short_description = 'Has Images'

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('title', 'issue_group', 'event_category', 'event_year', 'published_date')
    list_filter = ('event_category', 'event_year', 'issue_group')
    search_fields = ('title', 'issue_group')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)