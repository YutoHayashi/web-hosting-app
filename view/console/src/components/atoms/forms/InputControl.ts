import React from 'react';
import { CommonInputAttribute } from './CommonInputAttribute';
import { CommonInputStates } from './CommonInputStates';
import { Required, Email, } from './validators';
type Params = {
    context: React.Component<Partial<CommonInputAttribute>, CommonInputStates>;
    input: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}
export const InputControl = {
    isValid: ( _: Pick<Params, 'context'> ) => {
        const { context } = _;
        const value = context.state.value;
        const errorMessage = [
            context.props.required ? Required( value ) : true,
        ].map( _ => typeof _ === 'string' ? _ : '' ).reduce( ( p, c ) => `${ p !== '' ? ` ${ p }` : '' }${ c }`, '' );
        context.setState( { ...context.state, ...{ errorMessage, }, } );
        return errorMessage;
    },
    reset: ( _: Params ) => {
        const { context, input } = _;
        context.setState( { ...context.state, ...{ value: null }, } );
        if ( input.current ) input.current.value = '';
    },
    value: ( _: Pick<Params, 'context'> ) => {
        return _.context.state.value;
    },
};
