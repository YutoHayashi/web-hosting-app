from django.contrib.auth import update_session_auth_hash
from django.http import request
from rest_framework import serializers


from iam.models import IAM


class IAMMemberSerializer( serializers.ModelSerializer ):

    password = serializers.CharField( write_only=True, required=True )
    organization = serializers.UUIDField( required=False )

    class Meta:
        model       = IAM
        fields      = ( 'name', 'email', 'password', 'organization' )
        extra_kwargs= {
            'password': { 'write_only': True, },
        }

    def create( self, validated_data ):
        return IAM.objects.create_member( request_data=validated_data )

    def update( self, instance, validated_data ):
        if 'password' in validated_data:
            instance.set_password( validated_data.pop( 'password' ) )
        else:
            instance = super(  ).update( instance, validated_data, )
        instance.save(  )
        return instance


class IAMMemberListSerializer( serializers.ListSerializer ):

    child = IAMMemberSerializer(  )

    def create( self, validated_data ):
        return IAM.objects.bulk_create_member( validated_data )
