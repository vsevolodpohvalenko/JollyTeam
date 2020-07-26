from django.shortcuts import render
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import manufacturerProfilePageSerializer
from .models import manufacturerProfilePage
from rest_framework.generics import ListAPIView
from rest_framework import permissions


class ManufacturerProfilePageViewSet(ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = manufacturerProfilePage.objects.all()
    serializer_class = manufacturerProfilePageSerializer

    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('country', 'companyName', 'companyDescription', 'owner__first_name', "sections")


