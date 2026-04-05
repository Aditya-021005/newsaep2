from rest_framework import serializers
from .models import Article, ContactMessage, Member, ArticleImage, Issue

class ArticleImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = ArticleImage
        fields = ['id', 'image_url', 'caption']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image_file:
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return obj.image_file.url
        return None

class ArticleSerializer(serializers.ModelSerializer):
    images = ArticleImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = '__all__'
    
    def get_image_url(self, obj):
        if obj.image_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return obj.image_file.url
        return obj.image_url

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
        ]

    def get_pdf_url(self, obj):
        if not obj.pdf_file:
            return None
        
        # Use a relative path to avoid "Mixed Content (canceled)" errors
        # the browser will automatically use the correct domain/protocol of the current page.
        raw_url = obj.pdf_file.url
        return f"/api/proxy-pdf/?url={raw_url}"

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail:
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'