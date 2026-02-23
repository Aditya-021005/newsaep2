import os
import django
import random
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from news.models import Article

# Curated Unsplash IDs for premium aesthetic
IMAGE_POOLS = {
    'Technology': [
        '1518773553259-8351003429a1', # Server room
        '1550751827-4bd374c3f58b', # Cyberpunk CPU
        '1526374965328-7f61d4dc18c5'  # Matrix code
    ],
    'Business': [
        '1486406146926-c627a92ad1ab', # Modern skyscrapers
        '1507679799987-c73774586594', # Professional meeting
        '1460925895917-afdab827c52f'  # Analytics
    ],
    'Innovation': [
        '1451187580459-43490279c0fa', # Digital brain/globe
        '1485827404703-89b55fcc595e', # AI Robot
        '1581091226825-a6a2a5aee158'  # High tech lab
    ],
    'Culture': [
        '1499591934245-40b55745b905', # Abstract art
        '1518929458119-e57a8971ad1f', # Ancient sculpture
        '1536440136628-849c177e76a1'  # Cinematic theater
    ],
    'Urban': [
        '1449824913935-59a9fe5c202b', # Neon city street
        '1477332552946-cfb384afaf1a', # Modern glass building
        '1477959858617-67f85cf4f1df'  # City skyline
    ],
    'Legacy': [
        '1549144464-9eb5f073ea7d', # Analog computer
        '1501139083538-0139583c060f', # Vintage documents
        '1526304640581-d33a68df4149'  # Old typewriter
    ]
}

def get_image(category):
    pool = IMAGE_POOLS.get(category, IMAGE_POOLS['Innovation'])
    img_id = random.choice(pool)
    return f"https://images.unsplash.com/photo-{img_id}?q=80&w=2000&auto=format&fit=crop"

# Clear existing news to prevent duplicates with broken images
Article.objects.all().delete()

# 1. Main News
main_articles = [
    {'title': 'The Future of AI in Modern Journalism', 'category': 'Technology'},
    {'title': 'Global Economic Shifts in the Post-Digital Era', 'category': 'Business'},
    {'title': 'Sustainability: The New Benchmark for Innovation', 'category': 'Innovation'},
    {'title': 'The Rise of Smart Cities and Connected Living', 'category': 'Urban'},
    {'title': 'Digital Archaeology: Rediscovering History', 'category': 'Culture'}
]

now = timezone.now()

for art in main_articles:
    Article.objects.create(
        title=art['title'],
        content=f"Comprehensive analysis on {art['title']}. Integrating global data streams and expert insights to define the future of the {art['category']} sector. Verified by AEP_CORE.",
        summary=f"Key insights into {art['category']} transformation.",
        image_url=get_image(art['category']),
        category=art['category'],
        published_date=now - timedelta(hours=random.randint(1, 24))
    )

# 2. Legacy Archives
legacy_titles = [
    "Quantum Computing: The Genesis", "The First Digital Revolution", "Legacy Systems Analysis",
    "Archival Data Recovery Protocols", "Neural Interface Alpha Release", "Deep Space Relay V1",
    "Carbon Capture: Initial Findings", "Smart Grid Blueprint 2020", "The Bio-Digital Convergence",
    "Virtual Reality: The Early Days", "Autonomous Transit Genesis", "Global Connectivity 2015"
]

for title in legacy_titles:
    cat = random.choice(list(IMAGE_POOLS.keys()))
    Article.objects.create(
        title=title,
        content=f"Archived technical documentation for {title}. This intelligence cluster represents legacy data from the early post-digital era. Verified by AEP_HUB_SYS.",
        summary=f"Legacy archival data: {title}",
        image_url=get_image(cat),
        category=cat,
        published_date=now - timedelta(days=random.randint(365, 1000))
    )

print("Visual-optimized seeding completed successfully!")
