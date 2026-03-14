from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from foundation.api import (
    ArticleViewSet,
    ContactSubmissionCreateAPIView,
    HomepageAPIView,
    MagazineIssueViewSet,
    MagazineStoryViewSet,
    MediaAssetViewSet,
    PageViewSet,
    ProjectViewSet,
    SubscriberCreateAPIView,
    TestimonialViewSet,
)


router = DefaultRouter()
router.register(r"pages", PageViewSet, basename="page")
router.register(r"articles", ArticleViewSet, basename="article")
router.register(r"media", MediaAssetViewSet, basename="media")
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")
router.register(r"magazine/issues", MagazineIssueViewSet, basename="magazine-issue")
router.register(r"magazine/stories", MagazineStoryViewSet, basename="magazine-story")

urlpatterns = [
    path("", include(router.urls)),
    path("homepage/", HomepageAPIView.as_view(), name="homepage"),
    path("contact/", ContactSubmissionCreateAPIView.as_view(), name="contact-submit"),
    path("newsletter/subscribe/", SubscriberCreateAPIView.as_view(), name="newsletter-subscribe"),
]

