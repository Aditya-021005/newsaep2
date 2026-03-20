from django.db import migrations, models
class Migration(migrations.Migration):
    dependencies = [
        ('news', '0003_member'),
    ]
    operations = [
        migrations.AddField(
            model_name='article',
            name='image_file',
            field=models.ImageField(blank=True, null=True, upload_to='articles/'),
        ),
        migrations.AlterField(
            model_name='article',
            name='image_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]