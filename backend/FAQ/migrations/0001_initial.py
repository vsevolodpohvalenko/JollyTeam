# Generated by Django 3.0.8 on 2020-07-19 13:32

from django.db import migrations, models
import phone_field.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='activation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=75, unique=True, verbose_name='password')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=75)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=75)),
                ('companyName', models.CharField(max_length=100)),
                ('emailAddress', models.EmailField(max_length=254, unique=True)),
                ('phoneNumber', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31)),
                ('subject', models.CharField(max_length=100)),
                ('message', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='ContentPage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75)),
                ('BrowserTitle', models.CharField(max_length=75)),
                ('MetaDescription', models.TextField()),
                ('UrlSlug', models.CharField(max_length=75)),
                ('Content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75)),
                ('Thumbnail', models.ImageField(upload_to='')),
                ('Download', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='FAQ_Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75, unique=True, verbose_name='faq_Category_title')),
            ],
            options={
                'verbose_name': ('FAQ_Category',),
                'verbose_name_plural': 'FAQ_Categories',
            },
        ),
        migrations.CreateModel(
            name='FAQ_item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75, unique=True, verbose_name='faq_title')),
                ('Answer', models.TextField(max_length=400, unique=True, verbose_name='content')),
                ('Active', models.BooleanField(default=False, verbose_name='')),
            ],
            options={
                'verbose_name': 'FAQ',
                'verbose_name_plural': 'FAQS',
            },
        ),
        migrations.CreateModel(
            name='Home_Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75)),
                ('BrowserTitle', models.CharField(max_length=75)),
                ('MetaDescription', models.TextField(max_length=500)),
                ('UrlSlug', models.TextField(max_length=500)),
                ('SubTitle', models.TextField(max_length=500)),
                ('SearchPlaceholder', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='manufacturerProfilePage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CompanyProfilePicture', models.ImageField(default='defaultComProfPic.jpg', upload_to='')),
                ('CompanyName', models.CharField(blank=True, max_length=60)),
                ('CompanyDescription', models.TextField(default='Company Descriptions')),
                ('Country', models.CharField(blank=True, max_length=200)),
                ('CompanyLogo', models.ImageField(default='defaultComLogo.jpg', upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RequestForQuotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Keywords', models.CharField(max_length=100)),
                ('Category', models.CharField(max_length=100)),
                ('Descriptions', models.TextField(max_length=500)),
                ('Attachments', models.FileField(upload_to='')),
                ('PreferredCurrency', models.CharField(max_length=100)),
                ('PreferredUntilPrice', models.CharField(max_length=100)),
                ('PreferredShippingAgreement', models.CharField(max_length=100)),
                ('PaymentMethod', models.TextField()),
                ('iAgree', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=75)),
                ('Icon', models.ImageField(upload_to='')),
                ('Text', models.TextField(max_length=500)),
            ],
        ),
    ]
