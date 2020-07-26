from .models import FAQ_Group, FAQ_item, manufacturerProfilePage, Document, Section, Category, Home_Page, MenuItem, \
    ContentPage, Contact, RequestForQuotation, activation
from rest_framework import viewsets, permissions, generics
from .serializers import FAQGroupSerializer, FAQItemSerializer, manufacturerProfilePageSerializer, DocumentSerializer, \
    SectionSerializer, CategorySerializer, HomePageSerializer, MenuItemSerializer, ContactSerializer, \
    ContentPageSerializer, RequestForQuotationSerializer, ActivationSerializer



class FAQ_GroupViewSet(viewsets.ModelViewSet):
    queryset = FAQ_Group.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FAQGroupSerializer

class ActivationViewSet(viewsets.ModelViewSet):
    queryset = activation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActivationSerializer

class FAQ_itemViewSet(viewsets.ModelViewSet):
    queryset = FAQ_item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FAQItemSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DocumentSerializer


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SectionSerializer
class manufacturerProfilePageViewSet(viewsets.ModelViewSet):
    queryset = manufacturerProfilePage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = manufacturerProfilePageSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer


class Home_PageViewSet(viewsets.ModelViewSet):
    queryset = Home_Page.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomePageSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MenuItemSerializer


class ContentPageViewSet(viewsets.ModelViewSet):
    queryset = ContentPage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ContentPageSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ContactSerializer


class RequestForQuotationViewSet(viewsets.ModelViewSet):
    queryset = RequestForQuotation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RequestForQuotationSerializer
