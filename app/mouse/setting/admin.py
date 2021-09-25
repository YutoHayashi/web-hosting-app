from django.contrib import admin

# Register your models here.


from .models import RootSetting, AppSetting


admin.site.register( RootSetting )
admin.site.register( AppSetting )
