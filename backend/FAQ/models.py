from django.db import models
from phone_field import PhoneField
from django.conf import settings

User = settings.AUTH_USER_MODEL


def upload_path(instance, filename):
    return '/'.join(['manufacturerProfilePage', str(instance.companyName), filename])


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
    Answer = models.CharField('content', unique=True, max_length=255)
    Active = models.BooleanField('', default=False)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQS'


class manufacturerProfilePage(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    companyProfilePicture = models.ImageField(default='defaultComProfPic.jpg', upload_to=upload_path)
    companyName = models.CharField(max_length=60, blank=True, default="Company")
    companyDescription = models.TextField(default="Company Descriptions")
    country = models.CharField(max_length=200, blank=True, default="USA")
    companyLogo = models.ImageField(default='defaultComLogo.jpeg', upload_to=upload_path)
    sections = models.TextField(default="[{""}]")


class Document(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    Title = models.CharField(max_length=75, default= "")
    Thumbnail = models.ImageField(default='/images/thumbnail.jpg')
    Download = models.FileField(default='/images/thumbnail.jpg')


class Section(models.Model):
    Title = models.CharField(max_length=75, default="Section")


class Category(models.Model):
    Name = models.CharField(max_length=75)


class Home_Page(models.Model):
    Title = models.CharField(max_length=75)
    BrowserTitle = models.CharField(max_length=75)
    MetaDescription = models.TextField(max_length=500)
    UrlSlug = models.TextField(max_length=500)
    SubTitle = models.TextField(max_length=500)
    SearchPlaceholder = models.TextField(max_length=500)


class MenuItem(models.Model):
    Name = models.CharField(max_length=100)


class ContentPage(models.Model):
    Title = models.CharField(max_length=75)
    BrowserTitle = models.CharField(max_length=75)
    MetaDescription = models.TextField()
    UrlSlug = models.CharField(max_length=75)
    Content = models.TextField()


class Contact(models.Model):
    owner = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    name = models.CharField(max_length=75)
    companyName = models.CharField(max_length=100)
    emailAddress = models.EmailField(unique=True)
    phoneNumber = PhoneField(blank=True, help_text='Contact phone number')
    subject = models.CharField(max_length=100)
    message = models.TextField(max_length=500)


class RequestForQuotation(models.Model):
    keywords = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    descriptions = models.TextField(max_length=500)
    attachments = models.FileField()
    preferredCurrency = models.CharField(max_length=100)
    preferredUntilPrice = models.CharField(max_length=100)
    preferredShippingAgreement = models.CharField(max_length=100)
    paymentMethod = models.TextField()
    iAgree = models.CharField(max_length=10)


class Links(models.Model):
    find = models.CharField(max_length=30)

