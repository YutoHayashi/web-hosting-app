from rest_framework import serializers


from builder.models import Site


class SiteSerializer( serializers.ModelSerializer ):

    class Meta:
        model = Site
        fields = ()
        extra_kwargs = {}

    def create( self, validated_data ):
        return Site.objects.create( request_data=validated_data )

    def update( self, instance, validated_data ):
        return super( SiteSerializer, self ).update( instance, validated_data );
