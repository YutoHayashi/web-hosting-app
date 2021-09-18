from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from iam.serializers import IAMSerializer
from iam.models import IAM, IAMManager


class AIMRegister( generics.CreateAPIView ):

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
