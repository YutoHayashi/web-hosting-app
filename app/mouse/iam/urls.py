from django.conf.urls import include, url
from iam.views import IAMRegister, IAMMe, IAMMemberRegister, IAMDestroy


urlpatterns = [
    url( r'^register/$', IAMRegister.as_view(  ) ),
    url( r'^destroy/$', IAMDestroy.as_view(  ) ),
    url( r'^me/$', IAMMe.as_view(  ) ),
    url( r'^register/member', IAMMemberRegister.as_view(  ) ),
]
