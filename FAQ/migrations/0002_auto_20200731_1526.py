# Generated by Django 3.0.8 on 2020-07-31 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FAQ', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='Download',
            field=models.FileField(default='/images/thumbnail.jpg', upload_to=''),
        ),
    ]