import { Dispatch } from 'react';
import { IAM } from '@/types';
import { RootAction, RootState } from './index';
export const INDEX      = 'member/index';
export const PUSH       = 'member/push';
export type Action =
    { type: string; payload?: any; }
    & (
        | { type: typeof INDEX; }
        | { type: typeof PUSH; payload: IAM[]; }
    );
export type State = {
    member: {
        index: IAM[];
    };
};
export const state: State = {
    member: {
        index: [],
    },
};
export const reducer = ( state: RootState, action: RootAction ): RootState => {
    switch( action.type ) {
        case INDEX:
            return state;
        case PUSH:
            const newState = Object.assign( state );
            newState.member.index.push( ...action.payload );
            return { ...state, ...newState };
        default:
            break;
    }
    return state;
};
export type MemberDispatch = Dispatch<Action>;
