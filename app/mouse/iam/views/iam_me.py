from rest_framework import permissions, generics, status
from rest_framework.response import Response
from iam.serializers import IAMSerializer
from iam.models import IAM


class IAMMe( generics.RetrieveAPIView ):

    permission_classes = ( permissions.IsAuthenticated, )
    queryset = IAM.objects.all(  )
    serializer_class = IAMSerializer

    def get( self, request, format=None ):
        return Response(
            data    = {
                'name':         request.user.name,
                'email':        request.user.email,
                'organization': request.user.organization,
            },
            status  = status.HTTP_200_OK
        )
