import React, { Dispatch, ReactNode } from 'react';
import { IAM } from '@/types';
import { RootAction, RootState, Consumer } from './index';
export const SETME = 'set:me';
export const SETTOKEN = 'set:token';
export const CLEAR = 'clear:me';
export type Action =
    { type: string; payload?: any; }
    & (
        | { type: typeof SETTOKEN; payload: { token: string; } }
        | { type: typeof SETME; payload: { me: IAM }; }
        | { type: typeof CLEAR; }
    );
export type State = {
    me: IAM & { token: string; };
}
export const state: State = {
    me: {
        id: 0, name: '', email: '', organization: '', is_root: false, token: '',
    },
};
export const reducer = ( state: RootState, action: RootAction ): RootState => {
    switch( action.type ) {
        case SETTOKEN:
            const state_settoken: RootState = Object.assign( state );
            return { ...state, ...state_settoken };
        case SETME:
            const state_setme: RootState = Object.assign( state );
            state_setme.iam.me = action.payload.me;
            return { ...state, ...state_setme };
        case CLEAR:
            const me = { id: 0, name: '', email: '', organization: '', token: '', is_root: false, };
            return { ...state, ...{ iam: { me, } } };
        default:
            break;
    }
    return state;
};
export type IAMDispatch = Dispatch<Action>;
export const IAMConsumer: React.FC<{ children: ( args: { iam: IAM } ) => ReactNode }> = ( { children } ) => (
    <Consumer>
        { ( { state } ) => {
            if ( state?.iam.me ) {
                return children( { iam: state.iam.me, } );
            } else return <></>;
        } }
    </Consumer>
);
