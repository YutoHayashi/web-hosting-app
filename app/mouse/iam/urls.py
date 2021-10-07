from django.conf.urls import include, url
from iam.views import IAMRegister, IAMMe, IAMMemberIndex, IAMMemberRegister, IAMDestroy, IAMUpdate, IAMMemberUpdate, IAMMemberDestroy


urlpatterns = [
    url( r'^register/$', IAMRegister.as_view(  ) ),
    url( r'^me/$', IAMMe.as_view(  ) ),
    url( r'^update/$', IAMUpdate.as_view(  ) ),
    url( r'^destroy/$', IAMDestroy.as_view(  ) ),
    url( r'^member/index/$', IAMMemberIndex.as_view(  ), ),
    url( r'^member/destroy/$', IAMMemberDestroy.as_view(  ), ),
    url( r'^member/register/$', IAMMemberRegister.as_view(  ), ),
    url( r'^member/update/$', IAMMemberUpdate.as_view(  ), ),
]
