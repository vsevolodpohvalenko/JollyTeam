from django.db import models
from phone_field import PhoneField
from django.conf import settings
User = settings.AUTH_USER_MODEL

class FAQ_Group(models.Model):
    Title = models.CharField('faq_Category_title', max_length=75, unique=True)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ_Category',
        verbose_name_plural = 'FAQ_Categories'


class FAQ_item(models.Model):
    Group = models.ForeignKey(FAQ_Group, on_delete=models.CASCADE, default=1)
    Title = models.CharField('faq_title', max_length=75, unique=True)
    Answer = models.TextField('content', unique=True, max_length=400)
    Active = models.BooleanField('', default=False)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQS'

class manufacturerProfilePage(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    CompanyProfilePicture = models.ImageField(default= 'defaultComProfPic.jpg')
    CompanyName = models.CharField(max_length=60, blank= True)
    CompanyDescription = models.TextField(default="Company Descriptions")
    Country = models.CharField(max_length=200, blank= True)
    CompanyLogo = models.ImageField(default= 'defaultComLogo.jpg')
    Sections = models.TextField(default= 'Welcome to the sections')





class Document(models.Model):
    Title = models.CharField(max_length=75)
    Thumbnail = models.ImageField()
    Download = models.FileField()

class Section(models.Model):
    Section = models.TextField(default="This is section")


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
    MetaDescription=models.TextField()
    UrlSlug = models.CharField(max_length=75)
    Content = models.TextField()


class Contact(models.Model):
    owner = models.ForeignKey(User, default=1 ,on_delete=models.CASCADE )
    name=models.CharField(max_length=75)
    companyName = models.CharField(max_length=100)
    emailAddress = models.EmailField(unique=True)
    phoneNumber = PhoneField(blank=True, help_text='Contact phone number')
    subject = models.CharField(max_length=100)
    message = models.TextField(max_length=500)

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

class activation(models.Model):
    email = models.EmailField()
    password = models.CharField("password", max_length=75, unique=True)


    def __str__(self):
        return self.email
