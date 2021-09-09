from django import forms

class FindForm( forms.Form ):
    find = forms.CharField( label='Find', required=True, max_length=10, widget=forms.TextInput( attrs={ 'class': 'form-control' } ) )
    date = forms.DateField( label='Date', required=False, input_formats=['%d'], widget=forms.DateInput( attrs={ 'class': '', } ) )

    def clean( self ):
        cleandata = super(  ).clean(  )
        find = cleandata[ 'find' ]
        if ( find.lower(  ).startswith( 'no' ) ):
            raise forms.ValidationError( 'You input "NO"' )
        return cleandata
