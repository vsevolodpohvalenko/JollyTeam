"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView

from FAQ.views import CompanyProfilePageViewSet, LinksViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
                  path('api/', include('FAQ.urls')),
                  path('admin/', admin.site.urls),
                  path('api/auth/', include('djoser.urls.authtoken')),
                  path('api/auth/', include('djoser.urls')),
                  path('links', LinksViewSet.as_view(), name="Links"),
                  path('api/CompanyProfilePage', CompanyProfilePageViewSet.as_view(), name="CompanyProfilePage"),
                  path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]