
from rest_framework import routers
from .api import FAQ_itemViewSet, FAQ_GroupViewSet, manufacturerProfilePageViewSet, DocumentViewSet, SectionViewSet, CategoryViewSet, Home_PageViewSet, MenuItemViewSet, ContentPageViewSet, ContactViewSet, RequestForQuotationViewSet

router = routers.DefaultRouter()
router.register('api/faq_group', FAQ_GroupViewSet, 'faq_group')
router.register('api/faq_item', FAQ_itemViewSet, 'faq_items')
router.register('api/manufacturerProfilePage', manufacturerProfilePageViewSet, 'manufacturerProfilePage')
router.register('api/Document', DocumentViewSet, 'Document')
router.register('api/Section', SectionViewSet, 'Section')
router.register('api/Category', CategoryViewSet, 'Category')
router.register('api/Home_Page', Home_PageViewSet, 'Home_Page')
router.register('api/MenuItem', MenuItemViewSet, 'MenuItem')
router.register('api/ContentPage', ContentPageViewSet, 'ContentPage')
router.register('api/Contact', ContactViewSet, 'Contact')
router.register('api/RequestForQuotation', RequestForQuotationViewSet, 'RequestForQuotation')











urlpatterns = router.urls

