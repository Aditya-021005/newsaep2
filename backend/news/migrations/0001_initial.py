from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('image_url', models.URLField(blank=True, max_length=500, null=True)),
                ('image_file', models.ImageField(blank=True, null=True, upload_to='articles/')),
                ('published_date', models.DateTimeField(auto_now_add=True)),
                ('event_category', models.CharField(choices=[('Oasis', 'Oasis'), ('Apogee', 'Apogee'), ('BOSM', 'BOSM'), ('Other', 'Other')], default='Apogee', max_length=20)),
                ('event_year', models.IntegerField(default=2024)),
            ],
            options={
                'ordering': ['-published_date'],
            },
        ),
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('event_category', models.CharField(choices=[('Oasis', 'Oasis'), ('Apogee', 'Apogee'), ('BOSM', 'BOSM'), ('Other', 'Other')], max_length=20)),
                ('event_year', models.IntegerField()),
                ('pdf_file', models.FileField(blank=True, null=True, upload_to='issues/pdfs/')),
                ('pdf_external_url', models.URLField(blank=True, help_text='Direct link to a PDF (e.g. Google Drive direct link)', max_length=500, null=True)),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='issues/thumbnails/')),
                ('published_date', models.DateTimeField(auto_now_add=True, db_index=True)),
            ],
            options={
                'ordering': ['-event_year', '-published_date'],
            },
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=100)),
                ('image_url', models.URLField(blank=True, max_length=500, null=True)),
                ('bio', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ArticleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_file', models.ImageField(upload_to='articles/gallery/')),
                ('caption', models.CharField(blank=True, max_length=255)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='news.article')),
            ],
        ),
        migrations.AddIndex(
            model_name='issue',
            index=models.Index(fields=['-event_year', '-published_date'], name='news_issue_event_y_698380_idx'),
        ),
        migrations.AddIndex(
            model_name='issue',
            index=models.Index(fields=['event_category', 'event_year'], name='news_issue_event_c_18f972_idx'),
        ),
    ]
