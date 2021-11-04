import React from 'react';
import { Handler } from './types';
import { required as validateRequired } from './validators';
type Props = JSX.IntrinsicElements[ 'input' ] & {
    onUpdate?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    onValidate?: ( errors: Array<string | true> ) => void;
};
const checkbox: React.Ref<HTMLInputElement> = React.createRef<HTMLInputElement>(  );
export const Checkbox = React.forwardRef<Handler, Props>( ( props, ref ) => {
    const { onUpdate = e => null, onValidate = errors => null, required } = props;
    const validation = (  ) => {
        const val = checkbox.current?.checked || false;
        const results = [
            required !== undefined ? validateRequired( val ) : true,
        ];
        onValidate( results );
        return results;
    };
    const getValue = (  ) => checkbox.current?.checked || false;
    const reset = (  ) => {
        if ( checkbox.current ) checkbox.current.checked = false;
    };
    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        validation(  );
        onUpdate( e );
    };
    React.useImperativeHandle( ref, (  ) => ( { validation, getValue, reset } ) );
    return <input ref={ checkbox } type='checkbox' { ...{ ...props, ...{ onChange, } } } />
} );
