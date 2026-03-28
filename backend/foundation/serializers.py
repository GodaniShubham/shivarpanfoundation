from rest_framework import serializers
from .models import StoryItem

class StoryItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = StoryItem
        fields = ["id", "title", "image", "sort_order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
          return obj.image.public_url(request)
        return None
