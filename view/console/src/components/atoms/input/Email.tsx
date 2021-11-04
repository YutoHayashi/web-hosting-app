import React from 'react';
import { Handler } from './types';
import { required as validateRequired, email as validateEmail, maxLength as validateMaxLength, minLength as validateMinLength } from './validators';
type Props = JSX.IntrinsicElements[ 'input' ] & {
    onUpdate?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    onValidate?: ( errors: Array<string | true> ) => void;
};
const email: React.Ref<HTMLInputElement> = React.createRef<HTMLInputElement>(  );
export const Email = React.forwardRef<Handler, Props>( ( props, ref ) => {
    const { onUpdate = e => null, onValidate = errors => null, required, maxLength, minLength } = props;
    const validation = (  ) => {
        const val = email.current?.value || '';
        const results = [
            required !== undefined ? validateRequired( val ) : true,
            validateEmail( val ),
            maxLength !== undefined ? validateMaxLength( val, maxLength ) : true,
            minLength !== undefined ? validateMinLength( val, minLength ) : true,
        ];
        onValidate( results );
        return results;
    };
    const getValue = (  ) => email.current?.value || '';
    const reset = (  ) => {
        if ( email.current ) email.current.value = '';
    };
    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        validation(  );
        onUpdate( e );
    };
    React.useImperativeHandle( ref, (  ) => ( { validation, getValue, reset } ) );
    return <input ref={ email } type='email' { ...{ ...props, ...{ onChange, } } } />;
} );
