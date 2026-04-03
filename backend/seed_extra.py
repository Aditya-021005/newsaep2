import os
import django
import random
from django.utils import timezone
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from news.models import Issue, Article, ArticleImage, EVENT_CHOICES

def seed_extra():
    print("Seeding extra data (Events, Years, Issues)...")
    
    # 1. Update existing articles with event data
    articles = Article.objects.all()
    events = [e[0] for e in EVENT_CHOICES if e[0] != 'Other']
    years = [2023, 2024, 2025, 2026]
    
    for article in articles:
        article.event_category = random.choice(events)
        article.event_year = random.choice(years)
        article.save()
        
        # Add some gallery images (placeholders using the main image url)
        if article.image_url:
            for i in range(2):
                ArticleImage.objects.create(
                    article=article,
                    image_file=None, # We'll just use a caption for now or it might break if no file
                    caption=f"Gallery view {i+1} of {article.title}"
                )
    
    print(f"Updated {articles.count()} articles with event data.")

    # 2. Seed some Issues
    Issue.objects.all().delete()
    
    issue_titles = [
        "The Apogee Special Edition",
        "Oasis Chronicles: Volume I",
        "BOSM Daily: The Victory Lap",
        "English Press Club Quarterly",
        "Campus Recaps: 2026 Edition"
    ]
    
    dummy_pdf = ContentFile(b"Dummy PDF Content", name="dummy.pdf")
    
    for title in issue_titles:
        evt = random.choice(events)
        yr = random.choice(years)
        Issue.objects.create(
            title=title,
            event_category=evt,
            event_year=yr,
            pdf_file=dummy_pdf
        )
        
    print(f"Seeded {Issue.objects.count()} issues.")

if __name__ == "__main__":
    seed_extra()
