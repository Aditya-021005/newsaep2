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
        if obj.image_file:
            url = obj.image_file.url
        else:
            url = obj.image_url
            
        if url and '://' in url:
            # Check if it's our own domain or an external one (like Cloudinary)
            # If it's ours, make it relative. If it's Cloudinary, keep it as is.
            if 'cloudinary' not in url:
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
            'event_category',
            'event_year',
            'published_date',
            'pdf_url',
            'thumbnail_url',
            'pdf_external_url',
        ]

    def get_pdf_url(self, obj):
        # Priority 1: External URL (like Google Drive)
        url = obj.pdf_external_url
        
        # Priority 2: Local Upload
        if not url and obj.pdf_file:
            url = obj.pdf_file.url
            
        if not url:
            return None
        
        # Ensure the URL is just the path part for local files to avoid proxy loops
        if '://' in url:
            # Check if it's our own domain or an external one (like Google Drive/Cloudinary)
            # We proxy EVERYTHING via our local proxy to avoid CORS/Mixed Content
            # but we need to pass the full URL to the proxy if it's remote.
            pass # Keep full URL for remote
        else:
            # If it's a relative path, keep it relative for the proxy
            pass

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