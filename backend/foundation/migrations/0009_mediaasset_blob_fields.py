from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("foundation", "0008_donationpaymentlog"),
    ]

    operations = [
        migrations.AddField(
            model_name="mediaasset",
            name="content_type",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="mediaasset",
            name="file_blob",
            field=models.BinaryField(blank=True, editable=False, null=True),
        ),
        migrations.AddField(
            model_name="mediaasset",
            name="file_name",
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
