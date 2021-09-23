from django import dispatch


iam_deleted = dispatch.Signal( providing_args=[ 'instance' ] );
