import React from 'react';
import { Mdi } from '@/components/atoms/commons/Mdi';
import { Password } from '@/components/atoms/input/Password';
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
export const IAMMemberPassword = React.forwardRef<Handler, Props>( ( props, ref ) => {
    [ state, setState ] = React.useState<States>( { errors: [  ] } );
    const { errors } = state;
    return (
        <label className='inline-block w-full cursor-pointer my-3 text-gray-600'>
            <p className='text-sm font-bold'>Member account Password&nbsp;<RequiredLabel /></p>
            <small className='text-yellow-500'>{ errors.map( ( e, i ) => {
                if ( typeof e === 'string' ) {
                    return (
                        <span key={ i } className='w-full flex items-center'><Mdi icon='alert-circle' className='mr-2' />{ e }</span>
                    );
                }
            } ) }</small>
            <small className='text-gray-500 text-sm'></small>
            <Password ref={ ref } name='password' required placeholder='Member account Password' minLength={ 8 } maxLength={ 50 } className='text-base text-gray-500 font-bold w-full cursor-pointer outline-none focus:outline-none focus:ring-0 border-t-0 border-r-0 border-l-0 border-gray-500 focus:border-blue-500 bg-transparent py-1' onValidate={ onValidate } />
        </label>
    );
} );
