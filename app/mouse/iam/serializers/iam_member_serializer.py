from django.contrib.auth import update_session_auth_hash
from django.http import request
from rest_framework import serializers


from iam.models import IAM


class IAMMemberSerializer( serializers.ModelSerializer ):

    password = serializers.CharField( write_only=True, required=True, )
    organization = serializers.UUIDField( write_only=True, required=True )

    class Meta:
        model   = IAM
        fields  = ( 'name', 'email', 'password', 'organization' )

    def create( self, validated_data ):
        return IAM.objects.create_member( request_data=validated_data )
