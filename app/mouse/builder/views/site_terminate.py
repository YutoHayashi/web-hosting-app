from django.http import Http404
from rest_framework import permissions, generics, status
from rest_framework.mixins import DestroyModelMixin
from rest_framework.response import Response


from builder.serializers import SiteSerializer
from builder.models import Site
from iam.permissions import IsOrganizationAdministrator


class SiteTerminate( generics.GenericAPIView, DestroyModelMixin ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = Site.objects.all(  )
    serializer_class = SiteSerializer

    def get_object( self, ):
        try:
            instances = self.queryset.filter( name=self.request.data[ 'name' ] )
            return instances
        except Site.DoesNotExist:
            raise Http404

    def destroy( self, request, *args, **kwargs ):
        instances = self.get_object(  )
        instances.terminate(  )
        return Response( status=status.HTTP_204_NO_CONTENT )
