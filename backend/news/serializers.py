from rest_framework import serializers
from .models import Article, ContactMessage, Member, ArticleImage, Issue

class ArticleImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = ArticleImage
        fields = ['id', 'image_url', 'caption']
    
    def get_image_url(self, obj):
        if not obj.image_file:
            return None
            
        url = obj.image_file.url
        if '://' in url:
            from urllib.parse import urlparse
            url = urlparse(url).path
        return url

class ArticleSerializer(serializers.ModelSerializer):
    images = ArticleImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = '__all__'
    
    def get_image_url(self, obj):
        url = obj.image_file.url if obj.image_file else obj.image_url
        if url and '://' in url:
            from urllib.parse import urlparse
            url = urlparse(url).path
        return url

class IssueSerializer(serializers.ModelSerializer):
    pdf_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = [
            'id',
            'title',
            'issue_group',
            'event_category',
            'event_year',
            'published_date',
            'pdf_url',
            'thumbnail_url',
            'pdf_external_url',
        ]

    def get_pdf_url(self, obj):
        # Priority 1: External URL (like Google Drive)
        # Priority 2: Local Upload
        url = obj.pdf_external_url or (obj.pdf_file.url if obj.pdf_file else None)
        
        if not url:
            return None
        
        # If it's a relative path, keep it relative. If it's a full URL, keep it full.
        # The proxy_pdf view now handles both correctly (local vs remote).
        return f"/api/proxy-pdf/?url={url}"

    def get_thumbnail_url(self, obj):
        if not obj.thumbnail:
            return None
            
        url = obj.thumbnail.url
        if '://' in url:
            from urllib.parse import urlparse
            url = urlparse(url).path
        return url

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'