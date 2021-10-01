from django import dispatch


site_terminated = dispatch.Signal( providing_args=[ 'instance' ] )
