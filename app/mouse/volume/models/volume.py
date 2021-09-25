import os
import uuid


from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save


from mouse import settings
from iam.signals import iam_root_deleted


class VolumeQuerySet( models.QuerySet ):

    def delete( self, *args, **kwargs ):
        for obj in self:
            obj.is_active = False
            obj.save(  )


class VolumeManager( models.Manager.from_queryset( VolumeQuerySet ) ):

    def create( self, **data ):
        dirname = uuid.uuid4(  ).hex
        try:
            os.makedirs( f"{ settings.WEBVOL_PATH }{ dirname }", exist_ok=False )
        except Exception:
            print( 'faild mkdir' )
        return super( VolumeManager, self ).create( **data, dir=dirname, )


class Volume( models.Model ):

    iam         = models.ForeignKey( settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE, editable=False, related_name='volume', )
    dir         = models.UUIDField( editable=False, )
    is_active   = models.BooleanField( default=True, )
    created_at  = models.DateTimeField( auto_now_add=True )
    updated_at  = models.DateTimeField( auto_now_add=True )

    objects     = VolumeManager(  )

    def __str__( self, ):
        return f"Volume: { str( self.iam ) }"


@receiver( post_save, sender=settings.AUTH_USER_MODEL, )
def post_save_handler( sender, instance, created, *args, **kwargs ):
    if created:
        try:
            if instance.is_root:
                Volume.objects.create( iam=instance )
        except:
            pass


@receiver( iam_root_deleted, sender=settings.AUTH_USER_MODEL, )
def iam_root_deleted_handler( sender, instance, **kwargs ):
    Volume.objects.filter( iam=instance ).delete(  )


post_save.connect( post_save_handler, sender=settings.AUTH_USER_MODEL, )
iam_root_deleted.connect( iam_root_deleted_handler, sender=settings.AUTH_USER_MODEL, )
