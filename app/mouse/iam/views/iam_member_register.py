from django.db import transaction
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.serializers import IAMMemberSerializer
from iam.models import IAM
from iam.permissions import IsOrganizationAdministrator


class IAMMemberRegister( generics.CreateAPIView ):

    permission_classes = ( permissions.IsAuthenticated, IsOrganizationAdministrator )
    queryset = IAM.objects.all(  )
    serializer_class = IAMMemberSerializer

    @transaction.atomic
    def post( self, request, format=None ):
        serializer = IAMMemberSerializer( data=request.data )
        if serializer.is_valid(  ):
            serializer.save(  )
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
