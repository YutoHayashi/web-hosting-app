# Generated by Django 3.2.7 on 2021-09-19 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iam', '0002_auto_20210919_2147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iam',
            name='organization',
            field=models.UUIDField(default='141a95c32628445b960c67e30ff10558', editable=False),
        ),
    ]
