import React from 'react';
import { Handler } from './types';
import { required as validateRequired, maxLength as validateMaxLength, minLength as validateMinLength } from './validators';
type Props = JSX.IntrinsicElements[ 'input' ] & {
    onUpdate?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    onValidate?: ( errors: Array<string | true> ) => void;
};
const password: React.Ref<HTMLInputElement> = React.createRef<HTMLInputElement>(  );
export const Password = React.forwardRef<Handler, Props>( ( props, ref ) => {
    const { onUpdate = e => null, onValidate = errors => null, required, maxLength, minLength } = props;
    const validation = (  ) => {
        const val = password.current?.value || '';
        const results = [
            required !== undefined ? validateRequired( val ) : true,
            maxLength !== undefined ? validateMaxLength( val, maxLength ) : true,
            minLength !== undefined ? validateMinLength( val, minLength ) : true,
        ];
        onValidate( results );
        return results;
    };
    const value = (  ) => password.current?.value || '';
    const reset = (  ) => {
        if ( password.current ) password.current.value = '';
    };
    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        validation(  );
        onUpdate( e );
    };
    React.useImperativeHandle( ref, (  ) => ( { validation, value, reset } ) );
    return <input ref={ password } type='password' { ...{ ...props, ...{ onChange, } } } />;
} );
