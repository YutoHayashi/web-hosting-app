from django.db import models
from django.core.validators import ( MinValueValidator, MaxValueValidator, EmailValidator, URLValidator, RegexValidator, ValidationError )
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver
from django.db.models.signals import post_save


from iam.signals import iam_deleted
from mouse import settings


class AppSettingQuerySet( models.QuerySet ):

    def delete( self, *args, **kwargs ):
        for obj in self:
            obj.is_active = False;
            obj.save(  )


class AppSetting( models.Model ):

    iam         = models.OneToOneField( settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE, editable=False, related_name='app_settings', )
    is_active   = models.BooleanField( default=True, )
    created_at  = models.DateTimeField( auto_now_add=True )
    updated_at  = models.DateTimeField( auto_now_add=True )

    objects = AppSettingQuerySet.as_manager(  )

    def __str__( self, ):
        return str( self.iam )


@receiver( post_save, sender=settings.AUTH_USER_MODEL )
def post_save_handler( sender, instance, created, *args, **kwargs ):
    if created:
        try:
            AppSetting.objects.create( iam=instance )
        except:
            pass


@receiver( iam_deleted, sender=settings.AUTH_USER_MODEL )
def iam_deleted_handler( sender, instance, **kwargs ):
    AppSetting.objects.filter( iam=instance ).delete(  )


post_save.connect( post_save_handler, sender=settings.AUTH_USER_MODEL )
iam_deleted.connect( iam_deleted_handler, sender=settings.AUTH_USER_MODEL )
