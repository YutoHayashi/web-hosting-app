from django.db import transaction
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.permissions import IsOrganizationAdministrator
from builder.serializers import SiteSerializer
from builder.models import Site


class SiteRegister( generics.CreateAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = Site.objects.all(  )
    serializer_class = SiteSerializer

    @transaction.atomic
    def post( self, request, format=None ):
        serializer = SiteSerializer( data=request.data )
        if serializer.is_valid(  ):
            serializer.save(  )
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
