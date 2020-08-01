from django.shortcuts import render
from rest_framework import serializers
from .models import FAQ_Group, FAQ_item, Links, manufacturerProfilePage, Document, Section, Category, Home_Page, \
    MenuItem, ContentPage, Contact, RequestForQuotation
from django.core.mail import mail_admins
from django.conf import settings
from django.template import Context
from django.template.loader import get_template
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives


class FAQGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_Group
        fields = '__all__'


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = "__all__"


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_item
        fields = '__all__'


class manufacturerProfilePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = manufacturerProfilePage
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home_Page
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'


class ContentPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentPage
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def create(self, validate_data):
        instance = super(ContactSerializer, self).create(validate_data)

        html_content = render_to_string('contact.html', {'data': instance})
        # Then we create an "EmailMessage" object as usual.
        msg = EmailMultiAlternatives(
            instance.subject,
            instance.message,
            settings.EMAIL_HOST_USER,
            settings.ADMINS,
        )
        msg.attach_alternative(html_content, "text/html")
        # Then we send message.
        msg.send()
        return instance


class RequestForQuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestForQuotation
        fields = '__all__'

    def create(self, validate_data):
        instance = super(RequestForQuotationSerializer, self).create(validate_data)

        html_content = render_to_string('request_for_quotation.html', {'data': instance})
        image = instance.attachments
        # Then we create an "EmailMessage" object as usual.
        msg = EmailMultiAlternatives(
            'Hello',
            'hello2',
            settings.EMAIL_HOST_USER,
            settings.ADMINS,
            headers={'Message-ID': 'foo'},
        )
        msg.attach_alternative(html_content, "text/html")
        if image:
            mime_image = MIMEImage(image.read())
            mime_image.add_header('Content-ID', '<{}>'.format(image.name))
            msg.attach(mime_image)
        # Then we send message.
        msg.send()
        return instance
