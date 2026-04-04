import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File
from news.models import Article, ArticleImage, Issue


class Command(BaseCommand):
    help = "Upload existing local media files to Cloudinary storage."

    def add_arguments(self, parser):
        parser.add_argument(
            '--delete-local',
            action='store_true',
            help='Delete the local media file after successful upload to Cloudinary.',
        )

    def handle(self, *args, **options):
        delete_local = options['delete_local']
        default_storage = settings.DEFAULT_FILE_STORAGE

        if not default_storage.startswith('cloudinary_storage'):
            self.stdout.write(self.style.ERROR(
                'Cloudinary storage is not enabled. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET or CLOUDINARY_URL.'
            ))
            return

        media_root = Path(settings.MEDIA_ROOT)
        if not media_root.exists():
            self.stdout.write(self.style.ERROR(f'MEDIA_ROOT does not exist: {media_root}'))
            return

        objects = [
            (Issue, ['pdf_file', 'thumbnail']),
            (Article, ['image_file']),
            (ArticleImage, ['image_file']),
        ]

        for model, fields in objects:
            for item in model.objects.all():
                for field_name in fields:
                    field = getattr(item, field_name)
                    if not field:
                        continue

                    local_path = media_root / field.name
                    if not local_path.exists():
                        self.stdout.write(self.style.WARNING(
                            f'Skipping {model.__name__}[{item.pk}] {field_name}: local file not found at {local_path}'
                        ))
                        continue

                    with open(local_path, 'rb') as local_file:
                        field.save(field.name, File(local_file), save=False)
                    item.save(update_fields=[field_name])
                    self.stdout.write(self.style.SUCCESS(
                        f'Uploaded {model.__name__}[{item.pk}] {field_name} to Cloudinary: {field.name}'
                    ))

                    if delete_local:
                        try:
                            os.remove(local_path)
                            self.stdout.write(self.style.SUCCESS(
                                f'Deleted local file {local_path}'
                            ))
                        except OSError as exc:
                            self.stdout.write(self.style.WARNING(
                                f'Could not delete local file {local_path}: {exc}'
                            ))
