from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    dependencies = [
        ('news', '0004_article_image_file_alter_article_image_url'),
    ]

    operations = [
        # Create Issue model
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
        # Add index to Issue
        migrations.AddIndex(
            model_name='issue',
            index=models.Index(fields=['-event_year', '-published_date'], name='news_issue_event_y_698380_idx'),
        ),
        migrations.AddIndex(
            model_name='issue',
            index=models.Index(fields=['event_category', 'event_year'], name='news_issue_event_c_18f972_idx'),
        ),
        # Update Article model
        migrations.AddField(
            model_name='article',
            name='event_category',
            field=models.CharField(choices=[('Oasis', 'Oasis'), ('Apogee', 'Apogee'), ('BOSM', 'BOSM'), ('Other', 'Other')], default='Apogee', max_length=20),
        ),
        migrations.AddField(
            model_name='article',
            name='event_year',
            field=models.IntegerField(default=2024),
        ),
        # Create ArticleImage model
        migrations.CreateModel(
            name='ArticleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_file', models.ImageField(upload_to='articles/gallery/')),
                ('caption', models.CharField(blank=True, max_length=255)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='news.article')),
            ],
        ),
    ]
