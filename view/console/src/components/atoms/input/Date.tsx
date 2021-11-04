import React from 'react';
import { Handler } from './types';
import { required as validateRequired, max as validateMax, min as validateMin } from './validators';
type Props = JSX.IntrinsicElements[ 'input' ] & {
    onUpdate?: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    onValidate?: ( errors: Array<string | true> ) => void;
};
const date: React.Ref<HTMLInputElement> = React.createRef<HTMLInputElement>(  );
export const Date = React.forwardRef<Handler, Props>( ( props, ref ) => {
    const { onUpdate = e => null, onValidate = errors => null, required, max, min } = props;
    const validation = (  ) => {
        const val = date.current?.value || '';
        const results = [
            required !== undefined ? validateRequired( val ) : true,
            max !== undefined ? validateMax( val, max ) : true,
            min !== undefined ? validateMin( val, min ) : true,
        ];
        onValidate( results );
        return results;
    };
    const getValue = (  ) => date.current?.value || '';
    const reset = (  ) => {
        if ( date.current ) date.current.value = '';
    };
    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        validation(  );
        onUpdate( e );
    };
    React.useImperativeHandle( ref, (  ) => ( { validation, getValue, reset } ) );
    return <input ref={ date } type='date' { ...{ ...props, ...{ onChange, } } } />;
} );
