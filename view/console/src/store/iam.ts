import { Dispatch } from 'react';
import { IAM } from '@/types';
import { RootAction, RootState } from './index';
export const SETME = 'set:me';
export const SETTOKEN = 'set:token';
export type Action =
    { type: string; payload?: any; }
    & (
        | { type: typeof SETTOKEN; payload: { token: string; } }
        | { type: typeof SETME; payload: { me: IAM }; }
    );
export type State = {
    isAuthenticated: boolean;
    token: string;
    me: IAM;
}
export const state: State = {
    isAuthenticated: false,
    token: '',
    me: {
        id: 0, name: '', email: '', organization: '', is_root: false,
    },
};
export const reducer = ( state: RootState, action: RootAction ): RootState => {
    switch( action.type ) {
        case SETTOKEN:
            const state_settoken: RootState = Object.assign( state );
            state_settoken.iam.token = action.payload.token;
            return { ...state, ...state_settoken };
        case SETME:
            const state_setme: RootState = Object.assign( state );
            state_setme.iam.me = action.payload.me;
            state_setme.iam.isAuthenticated = true;
            return { ...state, ...state_setme };
        default:
            break;
    }
    return state;
};
export type IAMDispatch = Dispatch<Action>;

