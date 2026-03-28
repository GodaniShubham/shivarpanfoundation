from __future__ import annotations

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.models import Q


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
        user = user_model.objects.filter(Q(username=username) | Q(email=email)).first()
        created = user is None

        if user is None:
            user = user_model(username=username, email=email)

        updated_fields: list[str] = []

        if user.username != username:
            user.username = username
            updated_fields.append("username")

        if user.email != email:
            user.email = email
            updated_fields.append("email")

        if not user.is_active:
            user.is_active = True
            updated_fields.append("is_active")

        if not user.is_staff:
            user.is_staff = True
            updated_fields.append("is_staff")

        if not user.is_superuser:
            user.is_superuser = True
            updated_fields.append("is_superuser")

        user.set_password(password)
        updated_fields.append("password")
        if created:
            user.save()
        else:
            user.save(update_fields=updated_fields)

        message = (
            f"Created superuser '{username}'."
            if created
            else f"Updated superuser '{username}'."
        )
        self.stdout.write(self.style.SUCCESS(message))
