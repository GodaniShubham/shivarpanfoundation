from __future__ import annotations

from django.db import IntegrityError
from rest_framework import generics, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from foundation.models import (
    Article,
    Category,
    ContactSubmission,
    Homepage,
    HomepageSection,
    MagazineIssue,
    MagazineStory,
    MediaAsset,
    Page,
    PageSection,
    Project,
    Subscriber,
    Tag,
    Testimonial,
    UpcomingEvent,
)


class MediaAssetSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = MediaAsset
        fields = ["id", "title", "alt_text", "media_type", "url", "created_at"]

    def get_url(self, obj):
        if not getattr(obj, "file", None):
            return ""
        try:
            relative = obj.file.url
        except Exception:
            return ""

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(relative)
        return relative


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "slug"]


class PageSerializer(serializers.ModelSerializer):
    cover_image = MediaAssetSerializer(read_only=True)
    og_image = MediaAssetSerializer(read_only=True)
    sections = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "body",
            "embed_html",
            "publish_at",
            "cover_image",
            "sections",
            "seo_title",
            "seo_description",
            "canonical_url",
            "og_title",
            "og_description",
            "og_image",
            "created_at",
            "updated_at",
        ]

    def get_sections(self, obj):
        sections = obj.sections.filter(is_enabled=True).select_related("image").order_by("sort_order", "id")
        return PageSectionSerializer(sections, many=True, context=self.context).data


class ArticleSerializer(serializers.ModelSerializer):
    featured_image = MediaAssetSerializer(read_only=True)
    og_image = MediaAssetSerializer(read_only=True)
    social_share_image = MediaAssetSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "body",
            "author_name",
            "publish_at",
            "featured_image",
            "is_featured",
            "categories",
            "tags",
            "seo_title",
            "seo_description",
            "canonical_url",
            "og_title",
            "og_description",
            "og_image",
            "social_share_title",
            "social_share_description",
            "social_share_image",
            "created_at",
            "updated_at",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    featured_image = MediaAssetSerializer(read_only=True)
    og_image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "summary",
            "description",
            "partner_organization",
            "impact_numbers",
            "publish_at",
            "featured_image",
            "seo_title",
            "seo_description",
            "canonical_url",
            "og_title",
            "og_description",
            "og_image",
            "created_at",
            "updated_at",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    photo = MediaAssetSerializer(read_only=True)

    class Meta:
        model = Testimonial
        fields = ["id", "name", "designation", "organization", "quote", "photo", "created_at"]


class MagazineIssueSerializer(serializers.ModelSerializer):
    cover_image = MediaAssetSerializer(read_only=True)
    og_image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = MagazineIssue
        fields = ["id", "title", "slug", "description", "publish_at", "cover_image", "is_featured", "og_image"]


class MagazineStorySerializer(serializers.ModelSerializer):
    issue = MagazineIssueSerializer(read_only=True)
    featured_image = MediaAssetSerializer(read_only=True)
    og_image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = MagazineStory
        fields = [
            "id",
            "issue",
            "title",
            "slug",
            "excerpt",
            "body",
            "author_name",
            "publish_at",
            "featured_image",
            "highlight_on_homepage",
            "sort_order",
            "og_image",
        ]


class HomepageSectionSerializer(serializers.ModelSerializer):
    image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = HomepageSection
        fields = [
            "id",
            "section_type",
            "title",
            "body",
            "image",
            "embed_html",
            "button_text",
            "button_url",
            "sort_order",
            "is_enabled",
            "extra",
            "created_at",
            "updated_at",
        ]


class PageSectionSerializer(serializers.ModelSerializer):
    image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = PageSection
        fields = [
            "id",
            "section_type",
            "title",
            "body",
            "image",
            "embed_html",
            "button_text",
            "button_url",
            "sort_order",
            "is_enabled",
            "extra",
            "created_at",
            "updated_at",
        ]


class UpcomingEventSerializer(serializers.ModelSerializer):
    poster_image = MediaAssetSerializer(read_only=True)

    class Meta:
        model = UpcomingEvent
        fields = [
            "id",
            "title",
            "subtitle",
            "description",
            "date_label",
            "location_label",
            "poster_image",
            "cta_text",
            "cta_url",
            "sort_order",
            "is_active",
            "created_at",
            "updated_at",
        ]


class PublicPublishedOnlyMixin:
    def get_queryset(self):
        return super().get_queryset().published()


class MediaAssetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MediaAsset.objects.order_by("-created_at")
    serializer_class = MediaAssetSerializer
    filterset_fields = ["media_type"]


class PageViewSet(PublicPublishedOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all().order_by("-publish_at").prefetch_related("sections__image")
    serializer_class = PageSerializer
    filterset_fields = ["slug"]

    @action(detail=False, methods=["get"], url_path=r"by-slug/(?P<slug>[-a-zA-Z0-9_]+)")
    def by_slug(self, request, slug=None):
        obj = self.get_queryset().filter(slug=slug).first()
        if not obj:
            return Response({"detail": "Not found."}, status=404)
        return Response(self.get_serializer(obj).data)


class UpcomingEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UpcomingEvent.objects.all().order_by("sort_order", "-created_at")
    serializer_class = UpcomingEventSerializer
    filterset_fields = ["is_active"]

    @action(detail=False, methods=["get"], url_path="active")
    def active(self, request):
        event = self.get_queryset().filter(is_active=True).first()
        if not event:
            return Response({})
        return Response(self.get_serializer(event).data)


class ArticleViewSet(PublicPublishedOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all().order_by("-publish_at")
    serializer_class = ArticleSerializer
    filterset_fields = ["slug", "is_featured"]

    @action(detail=False, methods=["get"], url_path=r"by-slug/(?P<slug>[-a-zA-Z0-9_]+)")
    def by_slug(self, request, slug=None):
        obj = self.get_queryset().filter(slug=slug).first()
        if not obj:
            return Response({"detail": "Not found."}, status=404)
        return Response(self.get_serializer(obj).data)


class ProjectViewSet(PublicPublishedOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by("-publish_at")
    serializer_class = ProjectSerializer
    filterset_fields = ["slug"]


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_approved=True, is_hidden=False).order_by("-created_at")
    serializer_class = TestimonialSerializer


class MagazineIssueViewSet(PublicPublishedOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = MagazineIssue.objects.all().order_by("-publish_at")
    serializer_class = MagazineIssueSerializer
    filterset_fields = ["slug", "is_featured"]


class MagazineStoryViewSet(PublicPublishedOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = MagazineStory.objects.select_related("issue").all().order_by("sort_order", "-publish_at")
    serializer_class = MagazineStorySerializer
    filterset_fields = ["slug", "issue"]


class HomepageAPIView(generics.GenericAPIView):
    def get(self, request):
        homepage = Homepage.get_solo()
        sections_qs = homepage.sections.filter(is_enabled=True).select_related("image").order_by(
            "sort_order", "id"
        )
        data = {
            "hero_title": homepage.hero_title,
            "hero_subtitle": homepage.hero_subtitle,
            "hero_background_image": MediaAssetSerializer(
                homepage.hero_background_image, context={"request": request}
            ).data
            if homepage.hero_background_image
            else None,
            "hero_cta_text": homepage.hero_cta_text,
            "hero_cta_url": homepage.hero_cta_url,
            "featured_article": ArticleSerializer(homepage.featured_article, context={"request": request}).data
            if homepage.featured_article
            else None,
            "featured_page": PageSerializer(homepage.featured_page, context={"request": request}).data
            if homepage.featured_page
            else None,
            "partner_logos": MediaAssetSerializer(
                homepage.partner_logos.all(), many=True, context={"request": request}
            ).data,
            "show_testimonials": homepage.show_testimonials,
            "sections": HomepageSectionSerializer(sections_qs, many=True, context={"request": request}).data,
        }
        return Response(data)


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["name", "email", "phone", "company", "subject", "message"]


class ContactSubmissionCreateAPIView(generics.CreateAPIView):
    serializer_class = ContactSubmissionSerializer


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ["email", "name", "source"]


class SubscriberCreateAPIView(generics.CreateAPIView):
    serializer_class = SubscriberSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
        except IntegrityError:
            Subscriber.objects.filter(email=serializer.validated_data["email"]).update(
                name=serializer.validated_data.get("name", ""),
                source=serializer.validated_data.get("source", ""),
            )
