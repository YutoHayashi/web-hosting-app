from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Friend

class SampleView( TemplateView ):
    def __init__( self ):
        self.params = {
            'title': 'index',
            'message': 'this is a index page',
        }
    def get( self, request ):
        data = Friend.objects.all(  )
        self.params[ 'data' ] = data
        return render( request, 'api/index.html', self.params )
    def post( self, request ):
        id = request.POST[ 'id' ]
        data = Friend.objects.get( id=id )
        self.params[ 'data' ] = [ data ]
        return render( request, 'api/index.html', self.params )