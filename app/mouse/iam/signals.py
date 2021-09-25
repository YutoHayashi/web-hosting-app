from django import dispatch


iam_deleted = dispatch.Signal( providing_args=[ 'instance' ] )
iam_root_deleted = dispatch.Signal( providing_args=[ 'instance' ] );
iam_member_deleted = dispatch.Signal( providing_args=[ 'instance' ] )
