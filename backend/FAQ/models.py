from django.db import models
from phone_field import PhoneField


class FAQ_Group(models.Model):
    Title = models.CharField('faq_Category_title', max_length=75, unique=True)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ_Category',
        verbose_name_plural = 'FAQ_Categories'


class FAQ_item(models.Model):
    Group = models.ForeignKey(FAQ_Group, on_delete=models.CASCADE)
    Title = models.CharField('faq_title', max_length=75, unique=True)
    Answer = models.TextField('content', unique=True, max_length=400)
    Active = models.BooleanField('', default=False)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQS'

class manufacturerProfilePage(models.Model):
    CompanyName = models.CharField(max_length=60, blank= True)
    HeaderImage = models.ImageField()
    Icon = models.ImageField()
    Country = models.CharField(max_length=200, blank= True)
    Introduction = models.TextField(blank= True, max_length=400)
    Section = models.CharField(max_length=100)
    Documents = models.FileField()


class Document(models.Model):
    Title = models.CharField(max_length=75)
    Thumbnail = models.ImageField()
    Download = models.FileField()


class Section(models.Model):
    Title = models.CharField(max_length= 75)
    Icon = models.ImageField()
    Text = models.TextField(max_length=500)

class Category(models.Model):
    Name = models.CharField(max_length= 75)

class Home_Page(models.Model):
    Title=models.CharField(max_length=75)
    BrowserTitle=models.CharField(max_length=75)
    MetaDescription=models.TextField(max_length=500)
    UrlSlug=models.TextField(max_length=500)
    SubTitle=models.TextField(max_length=500)
    SearchPlaceholder = models.TextField(max_length=500)


class MenuItem(models.Model):
    Name = models.CharField(max_length=100)

class ContentPage(models.Model):
    Title = models.CharField(max_length=75)
    BrowserTitle = models.CharField(max_length=75)
    MetaDescription=models.TextField(max_length=500)
    UrlSlug = models.CharField(max_length=75)
    Content = models.TextField(max_length=500)


class Contact(models.Model):
    Name=models.CharField(max_length=75)
    CompanyName = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)
    Phone = PhoneField(blank=True, help_text='Contact phone number')
    Subject = models.CharField(max_length=100)
    Message = models.TextField(max_length=500)

class RequestForQuotation(models.Model):
    Keywords = models.CharField(max_length=100)
    Category = models.CharField(max_length=100)
    Descriptions=models.TextField(max_length=500)
    Attachments = models.FileField()
    PreferredCurrency=models.CharField(max_length=100)
    PreferredUntilPrice = models.CharField(max_length=100)
    PreferredShippingAgreement = models.CharField(max_length=100)
    PaymentMethod = models.TextField()
    iAgree=models.CharField(max_length=10)


