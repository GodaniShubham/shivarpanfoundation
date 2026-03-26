from rest_framework import serializers
from .models import StoryItem

class StoryItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = StoryItem
        fields = ["id", "title", "image", "sort_order"]

    def get_image(self, obj):
        if obj.image and obj.image.file:
          return obj.image.file.url
        return None