import { Dispatch } from 'react';
import { IAM } from '@/types';
import { RootAction, RootState } from './index';
export const ME    = 'me';
export const SETME = 'set:me';
export type Action =
    { type: string; payload?: any; }
    & (
        | { type: typeof ME; }
        | { type: typeof SETME; payload: { me: IAM }; }
    );
export type State = {
    is_authenticated: boolean;
    me: IAM;
}
export const state: State = {
    is_authenticated: false,
    me: {
        id: 0, name: '', email: '', organization: '', is_root: false,
    },
};
export const reducer = ( state: RootState, action: RootAction ): RootState => {
    switch( action.type ) {
        case ME:
            return state;
        case SETME:
            return ( { ...state, ...{ ...action.payload, is_authenticated: true, }, } );
        default:
            break;
    }
    return state;
};
export type IAMDispatch = Dispatch<Action>;

