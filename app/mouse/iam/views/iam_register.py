from django.db import transaction
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.serializers import IAMSerializer
from iam.models import IAM


class IAMRegister( generics.CreateAPIView ):

    permission_classes = ( permissions.AllowAny, )
    queryset = IAM.objects.all(  )
    serializer_class = IAMSerializer

    @transaction.atomic
    def post( self, request, format=None ):
        serializer = IAMSerializer( data=request.data )
        if serializer.is_valid(  ):
            serializer.save(  )
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
