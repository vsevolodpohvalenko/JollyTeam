from rest_framework import serializers
from .models import FAQ_Group, FAQ_item,activation , manufacturerProfilePage, Document, Section, Category, Home_Page, MenuItem, ContentPage, Contact, RequestForQuotation


class FAQGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_Group
        fields = '__all__'

class ActivationSerializer (serializers.ModelSerializer):
    class Meta:
        model = activation
        fields = '__all__'

class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_item
        fields = '__all__'



class manufacturerProfilePageSerializer(serializers.ModelSerializer):
    class Meta:
        model =  manufacturerProfilePage
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


class RequestForQuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestForQuotation
        fields = '__all__'

