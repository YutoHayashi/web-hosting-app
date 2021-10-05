import { RootAction, RootState } from './types';
import { reducer as IAMReducer } from './iam/reducer';
export const RootReducer = ( state: RootState, actions: RootAction ): RootState => {
    return {
        ...IAMReducer( state, actions ),
    };
};
