# Generated by Django 3.0.8 on 2020-07-21 10:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('FAQ', '0005_auto_20200721_0912'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='manufacturerprofilepage',
            name='Documents',
        ),
        migrations.RemoveField(
            model_name='section',
            name='Section',
        ),
        migrations.AddField(
            model_name='document',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='section',
            name='Title',
            field=models.CharField(default='Section', max_length=75),
        ),
    ]