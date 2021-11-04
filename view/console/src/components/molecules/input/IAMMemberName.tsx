import React from 'react';
import { Mdi } from '@/components/atoms/commons/Mdi';
import { Text } from '@/components/atoms/input/Text';
import { Handler } from '@/components/atoms/input/types';
import { RequiredLabel } from '@/components/atoms/input/RequiredLabel';
type Props = {
    value?: string;
};
type States = {
    errors: Array<string | true>;
};
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
const onValidate: ( errors: Array<string | true> ) => void = errors => setState( { errors, } );
export const IAMMemberName = React.forwardRef<Handler, Props>( ( props, ref ) => {
    const { value = '' } = props;
    [ state, setState ] = React.useState<States>( { errors: [  ] } );
    const { errors } = state;
    return (
        <label className='inline-block w-full cursor-pointer my-3 text-gray-600'>
            <p className='text-sm font-bold'>Member account Name&nbsp;<RequiredLabel /></p>
            <small className='text-yellow-500'>{ errors.map( ( e, i ) => {
                if ( typeof e === 'string' ) {
                    return (
                        <span key={ i } className='w-full flex items-center'><Mdi icon='alert-circle' className='mr-2' />{ e }</span>
                    );
                }
            } ) }</small>
            <small className='text-gray-500 text-sm'></small>
            <Text ref={ ref } name='name' autoFocus={ true } required placeholder='Member account Name' minLength={ 4 } maxLength={ 100 } className='text-base text-gray-500 font-bold w-full cursor-pointer outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-gray-500 focus:border-blue-500 bg-transparent py-1' onValidate={ onValidate } value={ value } />
        </label>
    );
} );
