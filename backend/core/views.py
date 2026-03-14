from __future__ import annotations

from django.http import Http404
from django.shortcuts import render
from django.http import HttpResponse

from foundation.models import Article, Homepage, MagazineIssue, MagazineStory, Page, Project, SiteSettings, Testimonial


def robots_txt(request):
    settings_obj = SiteSettings.get_solo()
    content = settings_obj.robots_txt or "User-agent: *\nDisallow:\n"
    return HttpResponse(content, content_type="text/plain; charset=utf-8")


def _site_context():
    site_settings = SiteSettings.get_solo()
    nav_pages = Page.objects.published().filter(show_in_nav=True).order_by("menu_title", "title")
    return {"site_settings": site_settings, "nav_pages": nav_pages}


def homepage_preview(request):
    homepage = Homepage.get_solo()
    sections = homepage.sections.filter(is_enabled=True).select_related("image").order_by("sort_order", "id")
    partner_logos = homepage.partner_logos.all()
    return render(
        request,
        "public/homepage.html",
        {**_site_context(), "homepage": homepage, "sections": sections, "partner_logos": partner_logos},
    )


def page_detail(request, slug: str):
    page = Page.objects.published().select_related("cover_image", "og_image").filter(slug=slug).first()
    if not page:
        raise Http404()
    return render(request, "public/page.html", {**_site_context(), "page": page})


def blog_list(request):
    articles = (
        Article.objects.published()
        .select_related("featured_image")
        .prefetch_related("categories", "tags")
        .order_by("-publish_at")[:50]
    )
    return render(request, "public/blog_list.html", {**_site_context(), "articles": articles})


def blog_detail(request, slug: str):
    article = (
        Article.objects.published()
        .select_related("featured_image", "og_image", "social_share_image")
        .prefetch_related("categories", "tags")
        .filter(slug=slug)
        .first()
    )
    if not article:
        raise Http404()
    return render(request, "public/blog_detail.html", {**_site_context(), "article": article})


def projects_list(request):
    projects = Project.objects.published().select_related("featured_image").order_by("-publish_at")[:50]
    return render(request, "public/projects_list.html", {**_site_context(), "projects": projects})


def projects_detail(request, slug: str):
    project = (
        Project.objects.published()
        .select_related("featured_image", "og_image", "testimonial")
        .prefetch_related("gallery")
        .filter(slug=slug)
        .first()
    )
    if not project:
        raise Http404()
    return render(request, "public/projects_detail.html", {**_site_context(), "project": project})


def magazine_list(request):
    issues = MagazineIssue.objects.published().select_related("cover_image").order_by("-publish_at")[:50]
    return render(request, "public/magazine_list.html", {**_site_context(), "issues": issues})


def magazine_issue_detail(request, slug: str):
    issue = (
        MagazineIssue.objects.published()
        .select_related("cover_image", "og_image")
        .filter(slug=slug)
        .first()
    )
    if not issue:
        raise Http404()
    stories = issue.stories.published().select_related("featured_image").order_by("sort_order", "-publish_at")
    return render(
        request,
        "public/magazine_issue_detail.html",
        {**_site_context(), "issue": issue, "stories": stories},
    )


def magazine_story_detail(request, slug: str):
    story = (
        MagazineStory.objects.published()
        .select_related("issue", "featured_image", "og_image")
        .filter(slug=slug)
        .first()
    )
    if not story:
        raise Http404()
    return render(request, "public/magazine_story_detail.html", {**_site_context(), "story": story})


def testimonials_list(request):
    testimonials = Testimonial.objects.filter(is_approved=True, is_hidden=False).select_related("photo").order_by(
        "-created_at"
    )[:100]
    return render(
        request, "public/testimonials.html", {**_site_context(), "testimonials": testimonials}
    )
