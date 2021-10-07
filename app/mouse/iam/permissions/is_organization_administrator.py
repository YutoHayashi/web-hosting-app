from rest_framework import permissions
from pprint import pprint

class IsOrganizationAdministrator( permissions.BasePermission ):

    edit_methods = ( 'POST' )

    def has_permission( self, request, view ):
        pprint( request.user.has_perm( 'iam.add_iam' ) )
        if ( request.user.is_root ):
            return True

    def has_object_permission( self, request, view, obj ):
        return False
