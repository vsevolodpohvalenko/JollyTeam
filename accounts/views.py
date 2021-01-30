from rest_framework.viewsets import ModelViewSet
from .models import UserAccount
from .serializers import UserCreateSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserCreateSerializer
    queryset = UserAccount.objects.all()
    permission_classes = []