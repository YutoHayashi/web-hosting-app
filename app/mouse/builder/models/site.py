import os
import uuid


from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


from iam.signals import iam_root_deleted
from mouse import settings


class SiteQuerySet( models.QuerySet ):

    def delete( self, *args, **kwargs ):
        for obj in self:
            obj.is_active = False
            obj.save(  )

    def terminate( self, *args, **kwargs ):
        for obj in self:
            obj.delete(  )


class SiteManager( models.Manager.from_queryset( SiteQuerySet ) ):

    def create( self, **data ):
        name = uuid.uuid4(  ).hex
        return super( SiteManager, self ).create( **data, name=name )


class Site( models.Model ):

    iam         = models.ForeignKey( settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE, editable=False, )
    name        = models.UUIDField( editable=False, )
    is_active   = models.BooleanField( default=True, )
    created_at  = models.DateTimeField( auto_now_add=True, )
    updated_at  = models.DateTimeField( auto_now_add=True, )

    objects     = SiteManager(  )

    def __str__( self ):
        return f"Site: { str( self.iam ) }"


@receiver( post_save, sender=settings.AUTH_USER_MODEL, )
def post_save_handler( sender, instance, created, *args, **kwargs, ):
    if created:
        try:
            if instance.is_root:
                Site.objects.create( iam=instance )
        except:
            pass


@receiver( iam_root_deleted, sender=settings.AUTH_USER_MODEL, )
def iam_root_deleted_handler( sender, instance, **kwargs ):
    Site.objects.filter( iam=instance ).delete(  )


post_save.connect( post_save_handler, sender=settings.AUTH_USER_MODEL, )
iam_root_deleted.connect( iam_root_deleted_handler, sender=settings.AUTH_USER_MODEL, )
