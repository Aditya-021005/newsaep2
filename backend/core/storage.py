from pathlib import Path

from cloudinary_storage.storage import MediaCloudinaryStorage, RESOURCE_TYPES


class AutoMediaCloudinaryStorage(MediaCloudinaryStorage):
    IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg'}
    VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi', '.webm', '.mkv'}
    RAW_EXTENSIONS = {'.pdf', '.doc', '.docx', '.txt', '.csv', '.xls', '.xlsx', '.ppt', '.pptx'}

    def _get_resource_type(self, name):
        extension = Path(name).suffix.lower()
        if extension in self.RAW_EXTENSIONS:
            return RESOURCE_TYPES['RAW']
        if extension in self.VIDEO_EXTENSIONS:
            return RESOURCE_TYPES['VIDEO']
        if extension in self.IMAGE_EXTENSIONS:
            return RESOURCE_TYPES['IMAGE']
        return RESOURCE_TYPES['RAW']
