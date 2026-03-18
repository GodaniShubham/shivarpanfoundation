
from __future__ import annotations

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------------------------------
# SECURITY
# -------------------------------------------------
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-secret-key-change-me")

DEBUG = os.environ.get("DJANGO_DEBUG", "1") not in {"0", "false", "False"}

TINYMCE_API_KEY = os.environ.get("TINYMCE_API_KEY", "")

ALLOWED_HOSTS_ENV = os.environ.get("DJANGO_ALLOWED_HOSTS", "")
if ALLOWED_HOSTS_ENV:
    ALLOWED_HOSTS = [h.strip() for h in ALLOWED_HOSTS_ENV.split(",") if h.strip()]
else:
    ALLOWED_HOSTS = ["*"] if DEBUG else []

# -------------------------------------------------
# INSTALLED APPS
# -------------------------------------------------
INSTALLED_APPS = [
    'jazzmin',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",

    # Third party
    "corsheaders",
    "rest_framework",
    "django_filters",

    # Local apps
    "foundation",
]

# -------------------------------------------------
# JAZZMIN (Django Admin Theme)
# -------------------------------------------------
JAZZMIN_SETTINGS = {
    "site_title": "Shivarpan Foundation Admin",
    "site_header": "Shivarpan Foundation",
    "site_brand": "Shivarpan Foundation",
    "welcome_sign": "Welcome",
    "search_model": "auth.User",
    "user_avatar": None,
    # Bootswatch themes: https://bootswatch.com/ (Jazzmin supports multiple)
    "theme": "lux",
    "dark_mode_theme": "cyborg",
    "show_ui_builder": True,
    "navigation_expanded": True,
    "related_modal_active": False,
    "changeform_format": "horizontal_tabs",
    # Optional branding assets (create these files if you want)
    "site_logo": "img/admin-logo.svg",
    "login_logo": "img/admin-logo.svg",
    "site_icon": "img/favicon.svg",
    "site_logo_classes": "brand-image",
    "custom_css": ["admin/custom.css?v=20260316"],
    "topmenu_links": [
        {"name": "View Site", "url": "/", "new_window": True},
    ],
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "foundation": "fas fa-hand-holding-heart",
    },
}

JAZZMIN_UI_TWEAKS = {
    "theme": "lux",
    "dark_mode_theme": "cyborg",
    "navbar": "navbar-dark navbar-primary",
    "navbar_fixed": True,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_flat_style": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "accent": "accent-primary",
    "button_classes": "btn btn-primary",
}

# -------------------------------------------------
# MIDDLEWARE
# -------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    # Custom analytics
    "core.middleware.AnalyticsMiddleware",
]

ROOT_URLCONF = "core.urls"

# -------------------------------------------------
# TEMPLATES
# -------------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "core" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

WSGI_APPLICATION = "core.wsgi.application"
ASGI_APPLICATION = "core.asgi.application"

# -------------------------------------------------
# DATABASE
# -------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.environ.get("DJANGO_DB_PATH", str(BASE_DIR / "db.sqlite3")),
    }
}

# -------------------------------------------------
# PASSWORD VALIDATION
# -------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -------------------------------------------------
# INTERNATIONALIZATION
# -------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = os.environ.get("DJANGO_TIME_ZONE", "Asia/Kolkata")

USE_I18N = True
USE_TZ = True

# -------------------------------------------------
# STATIC FILES
# -------------------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "foundation" / "static"]

# -------------------------------------------------
# MEDIA FILES (Images, uploads)
# -------------------------------------------------
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# -------------------------------------------------
# DEFAULT PRIMARY KEY
# -------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -------------------------------------------------
# DJANGO REST FRAMEWORK
# -------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend"
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny"
    ],
}

# -------------------------------------------------
# CORS SETTINGS (Frontend → Django API)
# -------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True

# -------------------------------------------------
# CSRF (for POST requests from frontend)
# -------------------------------------------------
CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS
