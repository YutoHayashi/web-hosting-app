from rest_framework import serializers


from builder.models import Action


class ActionSerializer( serializers.ModelSerializer ):

    class Meta:
        model = Action
        fields = ()
        extra_kwargs = {}

    def create( self, validated_data ):
        return Action.objects.create( request_data=validated_data )

    def update( self, instance, validated_data ):
        return super( ActionSerializer, self ).update( instance, validated_data )
