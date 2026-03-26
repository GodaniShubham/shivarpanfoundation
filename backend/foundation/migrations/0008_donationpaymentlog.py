from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("foundation", "0007_donation"),
    ]

    operations = [
        migrations.CreateModel(
            name="DonationPaymentLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "event_type",
                    models.CharField(
                        choices=[
                            ("created", "Created"),
                            ("checkout_requested", "Checkout Requested"),
                            ("order_created", "Order Created"),
                            ("plan_created", "Plan Created"),
                            ("subscription_created", "Subscription Created"),
                            ("verify_requested", "Verify Requested"),
                            ("verified", "Verified"),
                            ("failed", "Failed"),
                        ],
                        max_length=40,
                    ),
                ),
                ("status_snapshot", models.CharField(blank=True, max_length=32)),
                ("message", models.CharField(blank=True, max_length=255)),
                ("payload", models.JSONField(blank=True, default=dict)),
                (
                    "donation",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="payment_logs", to="foundation.donation"),
                ),
            ],
            options={"ordering": ["-created_at", "-id"]},
        ),
    ]
