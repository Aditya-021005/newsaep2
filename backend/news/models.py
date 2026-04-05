from django.db import models

EVENT_CHOICES = [
    ('Oasis', 'Oasis'),
    ('Apogee', 'Apogee'),
    ('BOSM', 'BOSM'),
    ('Other', 'Other'),
]

class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    image_file = models.ImageField(upload_to='articles/', blank=True, null=True)
    summary = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100, default='Trending')
    
    # New filterable fields
    event_category = models.CharField(max_length=20, choices=EVENT_CHOICES, default='Apogee')
    event_year = models.IntegerField(default=2024)

    def __str__(self):
        return self.title

class ArticleImage(models.Model):
    article = models.ForeignKey(Article, related_name='images', on_delete=models.CASCADE)
    image_file = models.ImageField(upload_to='articles/gallery/')
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image for {self.article.title}"

from django.db import models
from django.core.files.storage import FileSystemStorage

# Use local storage specifically for PDFs to avoid Cloudinary raw file issues
pdf_storage = FileSystemStorage(location='media/issues/pdfs/')

class Issue(models.Model):
    title = models.CharField(max_length=255)
    event_category = models.CharField(max_length=20, choices=EVENT_CHOICES)
    event_year = models.IntegerField()
    pdf_file = models.FileField(upload_to='issues/pdfs/', storage=pdf_storage if not models.fields.files.FieldFile else None) 
    # Note: We'll keep it flexible but suggest local storage for the file field
    thumbnail = models.ImageField(upload_to='issues/thumbnails/', blank=True, null=True)
    published_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_category} {self.event_year} - {self.title}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

class Member(models.Model):
    name = models.CharField(max_length=255)
    year = models.CharField(max_length=4)
    role = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.name} ({self.year})"