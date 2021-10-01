from django.db import transaction
from rest_framework import permissions, generics, status
from rest_framework.response import Response


from builder.serializers import ActionSerializer
from builder.models import Action


class ActionAccess( generics.CreateAPIView ):

    permissions = ()
    queryset = Action.objects.all(  )
    serializer_class = ActionSerializer

    @transaction.atomic
    def post( self, request, format=None ):
        request.data[ 'type' ] = 'access';
        serializer = ActionSerializer( data=request.data )
        if ( serializer.is_valid(  ) ):
            serializer.save(  )
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
