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

# 1. Extensive Population (100 Articles)
CATEGORIES_LIST = list(IMAGE_POOLS.keys())
now = timezone.now()

print(f"Generating 100 articles with 5 paragraphs each...")

for i in range(100):
    cat = random.choice(CATEGORIES_LIST)
    title_themes = {
        'Technology': ['Quantum Computing', 'Neural Link', 'Cyber-Defense', 'AI Governance', 'Hardware Genesis'],
        'Business': ['Global Markets', 'Corporate Hegemony', 'Economic Warfare', 'Trade Protocols', 'Market Synthesis'],
        'Innovation': ['Smart Fusion', 'Bio-Digital Shift', 'Energy Protocols', 'Materials Science', 'Next-Gen Habitats'],
        'Culture': ['Digital Art', 'Metropolitan History', 'The Human Interface', 'Archival Resurgence', 'Sonic Architecture'],
        'Urban': ['Neon Districts', 'Smart Infrastructure', 'Vertical Living', 'Transit Networks', 'Grid Management'],
        'Legacy': ['System Genesis', 'Ancient Data', 'The First Network', 'Hardware Lore', 'Protocol Zero']
    }
    
    theme = random.choice(title_themes.get(cat, ['The Chronicles']))
    title = f"{theme}: Intelligence Module {random.randint(1000, 9999)}"
    
    # Generate 5 Big Paragraphs
    p1 = f"The initial investigation into {theme} reveals a complex layering of legacy systems and modern-era protocols. Our intelligence streams suggest that the {cat} sector is undergoing a fundamental shift, moving away from centralized control toward a more fluid, algorithmically-governed state of existence. This transition is not without friction; the data suggests localized conflicts within the primary nodes of the network, requiring immediate algorithmic intervention and high-level verification."
    
    p2 = f"Further deep-scan analysis has identified several anomalous data clusters within the {theme} perimeter. These clusters appear to be remnants of earlier, less optimized versions of the {cat} architecture, suggesting a history of rapid development and occasional systemic failure. To mitigate these risks, the AEP_CORE has initiated a series of stabilization protocols, designed to harmonize the conflicting data streams and ensure a seamless integration of the new modules into the existing framework."
    
    p3 = f"Public sentiment regarding the {cat} transition remains highly volatile. Surveillance of the social matrix indicates a growing divide between those who embrace the algorithmic optimization and those who remain tethered to the legacy manual-input systems. This cultural friction is a primary driver of the current market instability, as seen in the fluctuating value of the primary data tokens. The chronicles must record this period of transition with absolute clarity, documenting both the technological marvels and the human costs involved."
    
    p4 = f"On a technical level, the {theme} implementation utilizes a multi-layered encryption scheme, ensuring that each data packet is verified at every transition point. This rigorous security protocol is essential for maintaining the integrity of the {cat} archives, especially in an era of increasing frequency-based attacks and unauthorized deep-scans. Our engineers are constantly refining these defenses, deploying new AI-driven heuristic models that can detect and neutralize threats before they manifest within the primary system architecture."
    
    p5 = f"In conclusion, the evolution of {theme} represents a significant milestone in our ongoing pursuit of systemic optimization. As we continue to refine the {cat} modules and integrate new intelligence clusters, the chronicles will remain the definitive record of our progress. Every byte of data, every verified transmission, and every stabilized node contributes to the grand architecture of the future. The transmission ends here, but the data remains eternal. Verified by AEP_SYSTEM_ADMIN."

    full_content = "\n\n".join([p1, p2, p3, p4, p5])
    
    Article.objects.create(
        title=title,
        content=full_content,
        summary=f"Extensive intelligence recap on {theme} and {cat} sector evolution.",
        image_url=get_image(cat),
        category=cat,
        published_date=now - timedelta(hours=random.randint(1, 48 * 14)) # Over last 2 weeks
    )

print("100 multi-paragraph chronicles seeded successfully!")

print("Visual-optimized seeding completed successfully!")
