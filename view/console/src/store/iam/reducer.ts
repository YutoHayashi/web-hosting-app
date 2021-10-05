import { IAM } from '@/types';
import { Action, State } from './types';
import { ME, SETME } from './const';
import { iam } from '@/request/iam';
export const reducer = ( state: State, actions: Action ): State => {
    switch( actions.type ) {
        case ME:
            return state;
        case SETME:
            return { ...state, ...actions.payload?.me, };
        default:
            return state;
    }
}
