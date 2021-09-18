from django.db import models


from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, _user_has_perm
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class IAMManager( BaseUserManager ):

    def create_user( self, request_data, **kwargs ):
        now = timezone.now(  )
        if not request_data[ 'name' ] or not request_data[ 'email' ]:
            raise ValueError( 'IAM must have name and email address' )
        iam = self.model(
            name=request_data[ 'name' ],
            email=request_data[ 'email' ],
            is_active=True,
            date_joined=now,
            last_login=now,
        )
        iam.set_password( request_data[ 'password' ] )
        iam.save( using=self._db )
        return iam

    def create_superuser( self, name, email, password, **extra_fields, ):
        request_data = {
            'name': name,
            'email': email,
            'password': password,
        }
        iam = self.create_user( request_data )
        iam.is_admin = True
        iam.save( using=self._db )
        return iam


class IAM( AbstractBaseUser ):

    name            = models.CharField( _( 'name' ), max_length=50, unique=True, )
    email           = models.EmailField( verbose_name='email address', max_length=255, unique=True, )
    is_active       = models.BooleanField( default=True, )
    is_admin        = models.BooleanField( default=False, )
    date_joined     = models.DateField( _( 'date joined' ), default=timezone.now )

    objects = IAMManager(  )

    USERNAME_FIELD = 'name'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = [ 'email' ]

    def __str__( self ):
        return self.name

    def user_has_perm( user, perm, obj ):
        return _user_has_perm( user, perm, obj )

    def has_perm( self, perm, obj=None ):
        return _user_has_perm( self, perm, obj )

    def has_module_perms( self, app_label ):
        return self.is_admin

    class Meta:
        db_table = 'iam'
        swappable = 'AUTH_USER_MODEL'
