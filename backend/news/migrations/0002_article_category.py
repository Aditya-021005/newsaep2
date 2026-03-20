from django.db import migrations, models
class Migration(migrations.Migration):
    dependencies = [
        ('news', '0001_initial'),
    ]
    operations = [
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.CharField(default='Trending', max_length=100),
        ),
    ]