from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.serializers import IAMMemberSerializer
from iam.models import IAM
from iam.permissions import IsOrganizationAdministrator


class IAMMemberIndex( generics.ListAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMMemberSerializer
    lookup_field = 'organization'

    def get_queryset( self ):
        return self.queryset.filter( organization=self.request.user.organization ).all(  )
