from django.db import models
from django.core.files.base import ContentFile
import io
import os
import requests
try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

EVENT_CHOICES = [
    ('Oasis', 'Oasis'),
    ('Apogee', 'Apogee'),
    ('BOSM', 'BOSM'),
    ('Other', 'Other'),
]

class Article(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True, db_index=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    image_file = models.ImageField(upload_to='articles/', blank=True, null=True)
    summary = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100, default='Trending', db_index=True)
    
    # New filterable fields
    event_category = models.CharField(max_length=20, choices=EVENT_CHOICES, default='Apogee', db_index=True)
    event_year = models.IntegerField(default=2024, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['event_category', 'event_year']),
        ]
        ordering = ['-published_date']

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
    title = models.CharField(max_length=255, db_index=True)
    event_category = models.CharField(max_length=20, choices=EVENT_CHOICES, db_index=True)
    event_year = models.IntegerField(db_index=True)
    pdf_file = models.FileField(upload_to='issues/pdfs/', storage=pdf_storage if not models.fields.files.FieldFile else None, blank=True, null=True) 
    pdf_external_url = models.URLField(max_length=500, blank=True, null=True, help_text="Direct link to a PDF (e.g. Google Drive direct link)")
    thumbnail = models.ImageField(upload_to='issues/thumbnails/', blank=True, null=True)
    published_date = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['-event_year', '-published_date']),
            models.Index(fields=['event_category', 'event_year']),
        ]
        ordering = ['-event_year', '-published_date']

    def save(self, *args, **kwargs):
        # Generate thumbnail automatically if a PDF is provided and we don't have a thumbnail
        if not self.thumbnail and (self.pdf_file or self.pdf_external_url):
            try:
                self.generate_thumbnail()
            except Exception as e:
                print(f"Warning: Could not generate thumbnail: {str(e)}")
        
        super().save(*args, **kwargs)

    def generate_thumbnail(self):
        """Generates a JPG thumbnail from the first page of the PDF."""
        if not fitz:
            return

        pdf_data = None
        
        # 1. Get PDF data from URL or local file
        if self.pdf_external_url:
            try:
                url = self.pdf_external_url
                session = requests.Session()
                headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
                
                # Handle Google Drive confirm token
                if 'drive.google.com' in url:
                    response = session.get(url, headers=headers, stream=True, timeout=15)
                    confirm_token = None
                    for key, value in session.cookies.items():
                        if key.startswith('download_warning'):
                            confirm_token = value
                            break
                    if confirm_token:
                        url = f"{url}&confirm={confirm_token}"
                        response = session.get(url, headers=headers, stream=True, timeout=15)
                else:
                    response = session.get(url, headers=headers, timeout=10)
                
                response.raise_for_status()
                pdf_data = response.content
            except Exception:
                return
        elif self.pdf_file:
            try:
                pdf_data = self.pdf_file.read()
                # Reset file pointer if we just read it
                self.pdf_file.seek(0)
            except Exception:
                return

        if not pdf_data:
            return

        # 2. Render first page using PyMuPDF
        try:
            doc = fitz.open(stream=pdf_data, filetype="pdf")
            if doc.page_count > 0:
                page = doc.load_page(0)  # first page
                
                # Higher resolution for better quality
                zoom = 2.0  
                mat = fitz.Matrix(zoom, zoom)
                pix = page.get_pixmap(matrix=mat, alpha=False)
                
                # Convert to PIL/BytesIO for Django to handle
                img_data = pix.tobytes("jpg")
                
                # 3. Save to thumbnail field
                filename = f"thumb_{os.path.basename(self.pdf_file.name if self.pdf_file else 'external')}"
                if not filename.endswith('.jpg'):
                    filename = os.path.splitext(filename)[0] + '.jpg'
                
                self.thumbnail.save(filename, ContentFile(img_data), save=False)
            doc.close()
        except Exception:
            pass

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