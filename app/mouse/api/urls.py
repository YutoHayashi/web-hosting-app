from django.urls import path
from .views import SampleView
urlpatterns = [
    path( r'', SampleView.as_view(  ), name='index', ),
]
