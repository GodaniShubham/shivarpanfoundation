from __future__ import annotations

import csv

from django import forms
from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone

from core.admin_site import admin_site
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
    PageView,
    Project,
    SiteSettings,
    Subscriber,
    Tag,
    Testimonial,
    Visitor,
)


class RichTextAdminMixin:
    rich_text_fields: tuple[str, ...] = ("body",)

    class Media:
        js = [
            "https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js",
            "foundation/js/tinymce-init.js",
        ]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for field_name in getattr(self, "rich_text_fields", ()):
            if field_name in form.base_fields:
                widget = form.base_fields[field_name].widget
                if isinstance(widget, forms.Textarea):
                    widget.attrs["class"] = (widget.attrs.get("class", "") + " richtext").strip()
        return form


@admin.register(MediaAsset, site=admin_site)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("__str__", "media_type", "created_at")
    list_filter = ("media_type", "created_at")
    search_fields = ("title", "file", "alt_text")


@admin.register(Page, site=admin_site)
class PageAdmin(RichTextAdminMixin, admin.ModelAdmin):
    list_display = ("title", "slug", "status", "publish_at", "updated_at")
    list_filter = ("status", "show_in_nav")
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("cover_image", "og_image")
    fieldsets = (
        (None, {"fields": ("title", "slug", "status", "publish_at", "show_in_nav", "menu_title")}),
        ("Content", {"fields": ("cover_image", "body", "embed_html")}),
        (
            "SEO",
            {
                "fields": (
                    "seo_title",
                    "seo_description",
                    "canonical_url",
                    "og_title",
                    "og_description",
                    "og_image",
                )
            },
        ),
    )


@admin.register(Category, site=admin_site)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Tag, site=admin_site)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Article, site=admin_site)
class ArticleAdmin(RichTextAdminMixin, admin.ModelAdmin):
    list_display = ("title", "slug", "status", "publish_at", "is_featured", "updated_at")
    list_filter = ("status", "is_featured", "categories", "tags")
    search_fields = ("title", "slug", "author_name")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("featured_image", "og_image", "social_share_image")
    filter_horizontal = ("categories", "tags")
    fieldsets = (
        (None, {"fields": ("title", "slug", "status", "publish_at", "author_name", "is_featured")}),
        ("Content", {"fields": ("featured_image", "excerpt", "body", "categories", "tags")}),
        (
            "SEO",
            {
                "fields": (
                    "seo_title",
                    "seo_description",
                    "canonical_url",
                    "og_title",
                    "og_description",
                    "og_image",
                )
            },
        ),
        ("Social Preview", {"fields": ("social_share_title", "social_share_description", "social_share_image")}),
    )


@admin.register(MagazineIssue, site=admin_site)
class MagazineIssueAdmin(RichTextAdminMixin, admin.ModelAdmin):
    rich_text_fields = ("description",)
    list_display = ("title", "slug", "status", "publish_at", "is_featured", "updated_at")
    list_filter = ("status", "is_featured")
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("cover_image", "og_image")


@admin.register(MagazineStory, site=admin_site)
class MagazineStoryAdmin(RichTextAdminMixin, admin.ModelAdmin):
    list_display = ("title", "issue", "status", "publish_at", "highlight_on_homepage", "sort_order")
    list_filter = ("status", "issue", "highlight_on_homepage")
    search_fields = ("title", "slug", "author_name")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("featured_image", "og_image")


@admin.register(Testimonial, site=admin_site)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "organization", "designation", "is_approved", "is_hidden", "created_at")
    list_filter = ("is_approved", "is_hidden")
    search_fields = ("name", "organization", "designation", "quote")
    autocomplete_fields = ("photo",)


@admin.register(Project, site=admin_site)
class ProjectAdmin(RichTextAdminMixin, admin.ModelAdmin):
    rich_text_fields = ("description", "summary")
    list_display = ("title", "slug", "status", "publish_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "slug", "partner_organization")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("featured_image", "testimonial", "og_image")
    filter_horizontal = ("gallery",)


@admin.register(HomepageSection, site=admin_site)
class HomepageSectionAdmin(RichTextAdminMixin, admin.ModelAdmin):
    list_display = ("section_type", "title", "homepage", "sort_order", "is_enabled", "updated_at")
    list_filter = ("section_type", "is_enabled")
    search_fields = ("title", "section_type")
    autocomplete_fields = ("image",)
    rich_text_fields = ("body", "embed_html")


class HomepageSectionInline(admin.TabularInline):
    model = HomepageSection
    extra = 0
    fields = ("sort_order", "section_type", "title", "is_enabled")
    ordering = ("sort_order", "id")


@admin.register(Homepage, site=admin_site)
class HomepageAdmin(admin.ModelAdmin):
    inlines = [HomepageSectionInline]
    autocomplete_fields = ("hero_background_image", "featured_article", "featured_page")
    filter_horizontal = ("partner_logos",)

    def has_add_permission(self, request):
        return not Homepage.objects.exists()


@admin.register(SiteSettings, site=admin_site)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(ContactSubmission, site=admin_site)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "phone", "company", "subject", "message")
    actions = ("export_csv", "mark_contacted")

    def export_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv")
        filename = f"contact_submissions_{timezone.now():%Y%m%d_%H%M}.csv"
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        writer = csv.writer(response)
        writer.writerow(["name", "email", "phone", "company", "subject", "message", "status", "created_at"])
        for obj in queryset.order_by("-created_at"):
            writer.writerow(
                [
                    obj.name,
                    obj.email,
                    obj.phone,
                    obj.company,
                    obj.subject,
                    obj.message,
                    obj.status,
                    obj.created_at.isoformat(),
                ]
            )
        return response

    export_csv.short_description = "Export selected to CSV (Excel)"

    def mark_contacted(self, request, queryset):
        queryset.update(status=ContactSubmission.Status.CONTACTED, contacted_at=timezone.now())

    mark_contacted.short_description = "Mark as contacted"


@admin.register(Subscriber, site=admin_site)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "source", "created_at")
    search_fields = ("email", "name", "source")
    actions = ("export_csv",)

    def export_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv")
        filename = f"subscribers_{timezone.now():%Y%m%d_%H%M}.csv"
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        writer = csv.writer(response)
        writer.writerow(["email", "name", "source", "created_at"])
        for obj in queryset.order_by("-created_at"):
            writer.writerow([obj.email, obj.name, obj.source, obj.created_at.isoformat()])
        return response

    export_csv.short_description = "Export selected to CSV (Excel)"


@admin.register(Visitor, site=admin_site)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ("visitor_id", "first_seen_at", "last_seen_at")
    search_fields = ("visitor_id",)


@admin.register(PageView, site=admin_site)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("path", "visitor", "created_at")
    list_filter = ("created_at",)
    search_fields = ("path", "full_path", "referer", "user_agent", "visitor__visitor_id")
    autocomplete_fields = ("visitor",)
