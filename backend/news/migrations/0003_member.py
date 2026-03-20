from django.db import migrations, models
class Migration(migrations.Migration):
    dependencies = [
        ('news', '0002_article_category'),
    ]
    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('year', models.CharField(max_length=4)),
                ('role', models.CharField(blank=True, max_length=255)),
            ],
        ),
    ]