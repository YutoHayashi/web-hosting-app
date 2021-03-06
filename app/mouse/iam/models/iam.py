import uuid


from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, _user_has_perm, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


from mouse import settings
from iam.signals import iam_deleted, iam_root_deleted, iam_member_deleted


class IAMManager( BaseUserManager ):

    def create_root( self, request_data, **kwargs ):
        now = timezone.now(  )
        organization = uuid.uuid4(  ).hex
        if not request_data[ 'name' ] or not request_data[ 'email' ]:
            raise ValueError( 'IAM must have name and email address' )
        iam = self.model(
            name        = request_data[ 'name' ],
            email       = request_data[ 'email' ],
            organization= organization,
            is_root     = True,
            date_joined = now,
            last_login  = now,
        )
        iam.set_password( request_data[ 'password' ] )
        iam.save( using=self._db )
        return iam

    def create_member( self, request_data, **kwargs ):
        now = timezone.now(  )
        if not request_data[ 'name' ] or not request_data[ 'email' ] or not request_data[ 'organization' ]:
            raise ValueError( 'IAM member must have name, email address and organization id' )
        iam = self.model(
            name        = request_data[ 'name' ],
            email       = request_data[ 'email' ],
            organization= request_data[ 'organization' ],
            date_joined = now,
            last_login  = now,
        )
        iam.set_password( request_data[ 'password' ] )
        iam.save( using=self._db )
        return iam

    def bulk_create_member( self, request_datas, **kwargs ):
        iams = [  ]
        for rd in request_datas:
            iams.append( self.create( rd ) )
        return iams;

    def create_superuser( self, name, email, password, **extra_fields, ):
        request_data = {
            'name':     name,
            'email':    email,
            'password': password,
        }
        iam = self.create_root( request_data )
        iam.is_admin = True
        iam.is_staff=True
        iam.is_superuser=True
        iam.save( using=self._db )
        return iam


class IAM( AbstractBaseUser, PermissionsMixin ):

    name            = models.CharField( _( 'name' ), max_length=50, unique=False, )
    email           = models.EmailField( verbose_name='email address', max_length=255, unique=True, )
    organization    = models.UUIDField( default='', editable=False, )
    is_root         = models.BooleanField( _( 'which root iam' ), default=False, editable=False, )
    is_staff        = models.BooleanField( default=False, )
    is_active       = models.BooleanField( default=True, )
    is_admin        = models.BooleanField( default=False, )
    date_joined     = models.DateField( _( 'date joined' ), default=timezone.now )
    created_at      = models.DateTimeField( auto_now_add=True )
    updated_at      = models.DateTimeField( auto_now_add=True )

    objects = IAMManager(  )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'name' ]

    def __str__( self ):
        return self.name

    def user_has_perm( user, perm, obj ):
        return _user_has_perm( user, perm, obj )

    def has_perm( self, perm, obj=None ):
        return _user_has_perm( self, perm, obj )

    def has_module_perms( self, app_label ):
        return self.is_admin

    def delete( self, ):
        if self.is_root:
            members = IAM.objects.filter( organization=self.organization ).filter( is_root=False ).all(  )
            for member in members:
                member.delete(  )
        self.is_active = False
        self.save(  )
        iam_deleted.send( sender=settings.AUTH_USER_MODEL, instance=self, )
        if self.is_root:
            iam_root_deleted.send( sender=settings.AUTH_USER_MODEL, instance=self )
        else:
            iam_member_deleted.send( sender=settings.AUTH_USER_MODEL, instance=self )

    class Meta:
        db_table = 'iam'
        swappable = 'AUTH_USER_MODEL'
