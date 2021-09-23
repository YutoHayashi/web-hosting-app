from django.http import Http404
from rest_framework import permissions, generics


from iam.models import IAM
from iam.serializers import IAMSerializer
from iam.permissions import IsOrganizationAdministrator


class IAMUpdate( generics.UpdateAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMSerializer

    def get_object( self, ):
        return self.queryset.filter( organization=self.request.data[ 'organization' ] ).filter( is_root=True ).get(  )

    def put( self, request, *args, **kwargs ):
        return self.partial_update( request, *args, **kwargs )
