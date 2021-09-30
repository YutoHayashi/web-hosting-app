from django.http import Http404
from rest_framework import permissions, generics, status
from rest_framework.response import Response


from builder.serializers import SiteSerializer
from builder.models import Site
from iam.permissions import IsOrganizationAdministrator


class SiteDestroy( generics.DestroyAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = Site.objects.all(  )
    serializer_class = SiteSerializer

    def get_object( self, ):
        try:
            instance = self.queryset.filter( name=self.request.data[ 'name' ] )[ 0 ]
            return instance
        except Site.DoesNotExist:
            raise Http404
