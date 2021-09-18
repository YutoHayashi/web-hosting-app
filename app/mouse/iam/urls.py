from django.conf.urls import include, url
from iam.views import AIMRegister


urlpatterns = [
    url( r'^register/$', AIMRegister.as_view(  ) )
]
