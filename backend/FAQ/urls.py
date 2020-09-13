rom
rest_framework
import routers
from .api import FAQ_itemViewSet, LinkViewSet, FAQ_GroupViewSet, DocumentViewSet, \
    SectionViewSet, CategoryViewSet, Home_PageViewSet, MenuItemViewSet, ContentPageViewSet, ContactViewSet, \
    RequestForQuotationViewSet, PaymentMethodsViewSet, CompanyProfilePageViewSet
from rest_framework import routers

from .api import FAQ_itemViewSet, LinkViewSet, FAQ_GroupViewSet, DocumentViewSet, \
    SectionViewSet, CategoryViewSet, Home_PageViewSet, MenuItemViewSet, ContentPageViewSet, ContactViewSet, \
    RequestForQuotationViewSet, PaymentMethodsViewSet, CompanyProfilePageViewSet

router = routers.DefaultRouter()
router.register('api/faq_group', FAQ_GroupViewSet, 'faq_group')
router.register('api/faq_item', FAQ_itemViewSet, 'faq_items')
router.register('api/Document', DocumentViewSet, 'Document')
router.register('api/CompanyProfilePage', CompanyProfilePageViewSet, 'CompanyProfilePage')
router.register('api/Section', SectionViewSet, 'Section')
router.register('api/Category', CategoryViewSet, 'Category')
router.register('api/Home_Page', Home_PageViewSet, 'Home_Page')
router.register('api/MenuItem', MenuItemViewSet, 'MenuItem')
router.register('api/ContentPage', ContentPageViewSet, 'ContentPage')
router.register('api/Contact', ContactViewSet, 'Contact')
router.register('api/RequestForQuotation', RequestForQuotationViewSet, 'RequestForQuotation')
router.register('api/link', LinkViewSet, 'Link')
router.register('api/PaymentMethods', PaymentMethodsViewSet, 'PaymentMethods')

urlpatterns = router.urls

