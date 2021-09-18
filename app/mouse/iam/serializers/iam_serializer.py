from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from iam.models import IAM, IAMManager


class IAMSerializer( serializers.ModelSerializer ):

    password = serializers.CharField( write_only=True, required=False )

    class Meta:
        model = IAM
        fields = ( 'id', 'name', 'email', 'password' )

    def create( self, validated_data ):
        return IAM.objects.create_user( request_data=validated_data )
