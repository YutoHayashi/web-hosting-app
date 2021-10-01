from django.contrib import admin

# Register your models here.


from .models import Site, Action

admin.site.register( Site )
admin.site.register( Action )
