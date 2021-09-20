from django.db import models


from django.core.validators import ( MinValueValidator, MaxValueValidator, EmailValidator, URLValidator, RegexValidator, ValidationError )
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete
from mouse import settings


class RootSetting( models.Model ):

    iam         = models.ForeignKey( settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE, editable=False, related_name='iam_settings', )
    is_active   = models.BooleanField( default=True, )

    def __str__( self ):
        return str( self.iam )


@receiver( post_save, sender=settings.AUTH_USER_MODEL )
def post_save_settings_model_receiver( sender, instance, created, *args, **kwargs ):
    if created:
        try:
            if instance.is_root:
                RootSetting.objects.create( iam=instance )
        except:
            pass


post_save.connect( post_save_settings_model_receiver, sender=settings.AUTH_USER_MODEL )
