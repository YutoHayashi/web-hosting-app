from django.shortcuts import render,redirect
from django.http import HttpResponse

# Create your views here.

from django.views.generic import TemplateView
from .models import Friend
from .forms import FindForm
from django.core.paginator import Paginator

class SampleView( TemplateView ):
    def __init__( self ):
        self.params = {
            'title': 'index',
            'message': 'this is a index page',
        }

    def get( self, request ):
        data = Friend.objects.all(  )
        page = request.GET.get( 'page', 1 )
        paginator = Paginator( data, 1 )
        self.params[ 'data' ] = paginator.get_page( page )
        self.params[ 'form' ] = FindForm(  )
        return render( request, 'api/index.html', self.params )

    def post( self, request ):
        form = FindForm( request.POST )
        find = request.POST[ 'find' ]
        data = Friend.objects.filter( name__contains=find )
        paginator = Paginator( data, 1 )
        self.params[ 'data' ] = paginator.get_page(  )
        self.params[ 'form' ] = FindForm( request.POST )
        if ( form.is_valid(  ) ):
            self.params[ 'message' ] = 'input is valid'
        else:
            self.params[ 'message' ] = 'input is not valid'
        return render( request, 'api/index.html', self.params )
