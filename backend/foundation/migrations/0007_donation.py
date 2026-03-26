from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foundation", "0006_storyitem"),
    ]

    operations = [
        migrations.CreateModel(
            name="Donation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("donor_name", models.CharField(max_length=255)),
                ("donor_email", models.EmailField(max_length=254)),
                ("donor_phone", models.CharField(max_length=32)),
                ("amount", models.PositiveIntegerField(help_text="Amount in rupees.")),
                ("currency", models.CharField(default="INR", max_length=8)),
                (
                    "donation_type",
                    models.CharField(
                        choices=[("one_time", "One Time"), ("monthly", "Monthly")],
                        default="one_time",
                        max_length=20,
                    ),
                ),
                ("payment_mode_preference", models.CharField(blank=True, max_length=50)),
                ("message", models.TextField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("created", "Created"),
                            ("checkout_created", "Checkout Created"),
                            ("paid", "Paid"),
                            ("subscription_authorized", "Subscription Authorized"),
                            ("failed", "Failed"),
                        ],
                        default="created",
                        max_length=32,
                    ),
                ),
                ("receipt", models.CharField(max_length=80, unique=True)),
                ("razorpay_order_id", models.CharField(blank=True, max_length=80)),
                ("razorpay_plan_id", models.CharField(blank=True, max_length=80)),
                ("razorpay_subscription_id", models.CharField(blank=True, max_length=80)),
                ("razorpay_payment_id", models.CharField(blank=True, max_length=80)),
                ("razorpay_signature", models.CharField(blank=True, max_length=255)),
                ("razorpay_status", models.CharField(blank=True, max_length=40)),
                ("notes", models.JSONField(blank=True, default=dict)),
                ("verified_at", models.DateTimeField(blank=True, null=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
