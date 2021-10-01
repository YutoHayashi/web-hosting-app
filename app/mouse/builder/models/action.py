import os
import uuid


from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


from builder.signals import site_terminated


class ActionQuerySet( models.QuerySet ):

    def terminate( self, *args, **kwargs ):
        for obj in self:
            obj.delete(  )


class ActionManager( models.Manager.from_queryset( ActionQuerySet ) ):

    pass


class Action( models.Model ):

    site        = models.ForeignKey( 'builder.Site', null=False, on_delete=models.CASCADE, editable=False )
    type        = models.CharField( verbose_name='action type', max_length=20, )
    page        = models.CharField( verbose_name='page name', max_length=50, )
    value       = models.CharField( max_length=255 )
    created_at  = models.DateTimeField( auto_now_add=True, )
    updated_at  = models.DateTimeField( auto_now_add=True, )

    objects     = ActionManager(  )

    def __str__( self, ):
        return f"Action: { str( self.site ) }"


@receiver( site_terminated, sender='builder.Site', )
def site_terminated_handler( sender, instance, **kwargs ):
    Action.objects.filter( site=instance ).terminate(  );


site_terminated.connect( site_terminated_handler, sender='builder.Site', )
