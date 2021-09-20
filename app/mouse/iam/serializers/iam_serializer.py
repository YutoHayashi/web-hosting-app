from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers


from iam.models import IAM


class IAMSerializer( serializers.ModelSerializer ):

    password = serializers.CharField( write_only=True, required=True )

    class Meta:
        model = IAM
        fields = ( 'name', 'email', 'password', )

    def create( self, validated_data ):
        return IAM.objects.create_org( request_data=validated_data )
