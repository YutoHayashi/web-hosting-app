from django.http import Http404
from rest_framework import permissions, generics


from iam.models import IAM
from iam.serializers import IAMMemberSerializer
from iam.permissions import IsOrganizationAdministrator


class IAMMemberUpdate( generics.UpdateAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMMemberSerializer

    def get_object( self, ):
        return self.queryset.get( email=self.request.data[ 'email' ] )

    def put( self, request, *args, **kwargs ):
        return self.partial_update( request, *args, **kwargs )
