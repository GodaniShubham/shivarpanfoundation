from __future__ import annotations

from django.contrib.admin.sites import AdminSite
from django.utils import timezone

from foundation.models import Article, ContactSubmission, Page, PageView, SiteSettings, Visitor


class FoundationAdminSite(AdminSite):
    site_header = "Shivarpan Foundation Admin"
    site_title = "Shivarpan Admin"
    index_title = "Dashboard"

    def each_context(self, request):
        context = super().each_context(request)
        context["site_settings"] = SiteSettings.get_solo()
        return context

    def index(self, request, extra_context=None):
        now = timezone.now()
        extra_context = extra_context or {}

        extra_context["kpi_visitors_total"] = Visitor.objects.count()
        extra_context["kpi_pageviews_total"] = PageView.objects.count()
        extra_context["kpi_pages_total"] = Page.objects.count()
        extra_context["kpi_articles_total"] = Article.objects.count()

        extra_context["recent_pageviews"] = (
            PageView.objects.select_related("visitor").order_by("-created_at")[:10]
        )
        extra_context["recent_contacts"] = ContactSubmission.objects.order_by("-created_at")[:10]
        extra_context["contacts_new_count"] = ContactSubmission.objects.filter(
            status=ContactSubmission.Status.NEW
        ).count()

        extra_context["now"] = now
        return super().index(request, extra_context=extra_context)


admin_site = FoundationAdminSite(name="foundation_admin")

# Ensure all model registrations go to this site
from foundation import admin as foundation_admin  # noqa: E402,F401

