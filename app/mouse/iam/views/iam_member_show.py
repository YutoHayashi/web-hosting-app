from rest_framework import permissions, generics
from iam.serializers import IAMMemberSerializer
from iam.permissions import IsOrganizationAdministrator


from iam.models import IAM


class IAMMemberShow( generics.RetrieveAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMMemberSerializer
    lookup_fields = [ 'pk' ]
