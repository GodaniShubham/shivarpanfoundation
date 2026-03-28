from __future__ import annotations

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create or update a superuser from DJANGO_SUPERUSER_* env vars."

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "")

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    "Skipping superuser setup because DJANGO_SUPERUSER_USERNAME, "
                    "DJANGO_SUPERUSER_EMAIL, or DJANGO_SUPERUSER_PASSWORD is missing."
                )
            )
            return

        user_model = get_user_model()
        user, created = user_model.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "is_staff": True,
                "is_superuser": True,
            },
        )

        updated_fields: list[str] = []

        if user.email != email:
            user.email = email
            updated_fields.append("email")

        if not user.is_staff:
            user.is_staff = True
            updated_fields.append("is_staff")

        if not user.is_superuser:
            user.is_superuser = True
            updated_fields.append("is_superuser")

        user.set_password(password)
        updated_fields.append("password")
        user.save(update_fields=updated_fields)

        message = (
            f"Created superuser '{username}'."
            if created
            else f"Updated superuser '{username}'."
        )
        self.stdout.write(self.style.SUCCESS(message))
