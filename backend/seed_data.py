import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from news.models import Article

articles = [
    {
        'title': 'The Future of AI in Modern Journalism',
        'content': 'Artificial Intelligence is revolutionizing the way news is gathered, processed, and delivered. From automated fact-checking to personalized news feeds, the digital landscape is undergoing a profound transformation. Experts suggest that the synergy between human intuition and machine efficiency will define the next decade of media.',
        'summary': 'Exploring the transformative impact of AI on global newsrooms.',
        'image_url': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
        'category': 'Technology',
    },
    {
        'title': 'Global Economic Shifts in the Post-Digital Era',
        'content': 'As the world transitions into a more integrated digital economy, traditional market structures are being challenged. Decentralized finance and digital assets are no longer edge cases but central themes in international trade discussions. Resilience and adaptability are the new currencies of the 21st century.',
        'summary': 'How digital transformation is reshaping global trade and finance.',
        'image_url': 'https://images.unsplash.com/photo-1526303328184-975fb4d3b3fb?q=80&w=2000&auto=format&fit=crop',
        'category': 'Business',
    },
    {
        'title': 'Sustainability: The New Benchmark for Innovation',
        'content': 'Modern innovation is no longer just about speed and efficiency; it is about sustainability. Leading tech firms are now prioritizing carbon-neutral operations and circular product life cycles. This shift marks a significant milestone in corporate responsibility and environmental stewardship.',
        'summary': 'Sustainability is becoming the core driver of modern technological progress.',
        'image_url': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop',
        'category': 'Innovation',
    },
    {
        'title': 'Digital Archaeology: Rediscovering History',
        'content': 'New scanning technologies are allowing researchers to explore ancient civilizations without disturbing the sites. From satellite imagery to LiDAR, the secrets of the past are being revealed in stunning detail, offering new perspectives on human history and migration patterns.',
        'summary': 'How modern tech is uncovering the hidden secrets of ancient civilizations.',
        'image_url': 'https://images.unsplash.com/photo-1549642191-b15244ff993d?q=80&w=2000&auto=format&fit=crop',
        'category': 'Culture',
    },
    {
        'title': 'The Rise of Smart Cities and Connected Living',
        'content': 'Urban environments are becoming smarter, with data-driven infrastructure improving the quality of life for millions. From intelligent traffic management to energy-efficient buildings, the concept of a connected city is fast becoming a reality in major metropolitan areas around the world.',
        'summary': 'Smart infrastructure is transforming urban living and sustainability.',
        'image_url': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop',
        'category': 'Urban',
    }
]

for art in articles:
    Article.objects.update_or_create(
        title=art['title'],
        defaults={
            'content': art['content'],
            'summary': art['summary'],
            'image_url': art['image_url'],
            'category': art.get('category', 'Trending')
        }
    )

print("Seed completed successfully!")
