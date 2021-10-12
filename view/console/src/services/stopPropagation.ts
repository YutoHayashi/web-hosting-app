import React from 'react';
export const stopPropagation: <T = HTMLElement>( callbacks?: ( e: React.MouseEvent<T> ) => void ) => React.MouseEventHandler<T> = ( callbacks = e => null ) => {
    return e => {
        e.stopPropagation(  );
        Reflect.apply( callbacks, undefined, [ e ] );
    }
}
