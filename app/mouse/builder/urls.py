from django.conf.urls import include, url
from builder.views import SiteRegister, SiteDestroy, SiteTerminate, ActionAccess, ActionSession


urlpatterns = [
    url( r'^register/$', SiteRegister.as_view(  ) ),
    url( r'^destroy/$', SiteDestroy.as_view(  ) ),
    url( r'^terminate/$', SiteTerminate.as_view(  ) ),

    url( r'^access/$', ActionAccess.as_view(  ) ),
    url( r'^session/$', ActionSession.as_view(  ) ),
]
