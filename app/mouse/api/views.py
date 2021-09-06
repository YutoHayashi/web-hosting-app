from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index( request ):
    return render( request, 'api/index.html', {
        'title': 'API view',
        'message': 'api template page. aaaaaaaaaaaaa',
    } )

def next( request ):
    return HttpResponse( 'next' )
