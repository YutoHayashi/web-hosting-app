from django.conf.urls import include, url
from builder.views import SiteRegister


urlpatterns = [
    url( r'^register/$', SiteRegister.as_view(  ) ),
]
