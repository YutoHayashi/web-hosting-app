from django.http import Http404
from rest_framework import permissions, generics, status
from rest_framework.response import Response


from iam.serializers import IAMMemberSerializer
from iam.models import IAM
from iam.permissions import IsOrganizationAdministrator


class IAMMemberDestroy( generics.DestroyAPIView ):

    permissions_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMMemberSerializer
    lookup_field = 'email'

    def get_object( self, ):
        try:
            instance = self.queryset.filter( email=self.request.data[ 'email' ] )[ 0 ]
            return instance
        except IAM.DoesNotExist:
            raise Http404
