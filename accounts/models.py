from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import ugettext_lazy as _

class UserAccountManager(BaseUserManager):


    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email = email, first_name = first_name, last_name = last_name, **extra_fields)

        user.set_password(password)
        user.save()
        return  user

    def create_superuser(self, email, first_name,  password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, is_superuser=True, first_name=first_name,  **extra_fields)

        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(_('email address'),blank=True, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, default="Fatherson")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = UserAccountManager()

    def get_full_name(self):
        return  self.email

    def __str__(self):
        return self.email