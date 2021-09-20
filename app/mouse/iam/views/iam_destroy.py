from django.db import transaction
from django.http import Http404
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.serializers import IAMSerializer
from iam.models import IAM
from iam.permissions import IsOrganizationAdministrator


class IAMDestroy( generics.DestroyAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMSerializer
    lookup_field = 'organization'

    def get_object( self, ):
        try:
            instance = self.queryset.filter( organization=self.request.user.organization )[ 0 ]
            return instance
        except IAM.DoesNotExist:
            raise Http404
