import { Dispatch } from 'react';
import { IAM } from '@/types';
import { RootAction, RootState } from './index';
export const SET        = 'member/set';
export const PUSH       = 'member/push';
export type Action =
    { type: string; payload?: any; }
    & (
        | { type: typeof SET; payload: IAM[]; }
        | { type: typeof PUSH; payload: IAM[]; }
    );
export type State = {
    loaded: boolean;
    index: IAM[];
};
export const state: State = {
    loaded: false,
    index: [],
};
export const reducer = ( state: RootState, action: RootAction ): RootState => {
    switch( action.type ) {
        case SET:
            const state_set: RootState = Object.assign( state );
            state_set.member.index = action.payload;
            state_set.member.loaded = true;
            return { ...state, ...state_set };
        case PUSH:
            const state_push = Object.assign( state );
            state_push.member.index.push( ...action.payload );
            return { ...state, ...state_push };
        default:
            break;
    }
    return state;
};
export type MemberDispatch = Dispatch<Action>;
