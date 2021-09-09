from rest_framework import routers
from django.urls import path
from .views import UserViewSet, EntryViewSet
urlpatterns = [
]
router = routers.DefaultRouter(  )
router.register( r'users', UserViewSet )
router.register( r'entries', EntryViewSet )
