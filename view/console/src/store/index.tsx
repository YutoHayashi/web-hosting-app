import React, { useReducer, ReactNode, useContext } from 'react';
import { State as IAMState, IAMDispatch, Action as IAMAction, reducer as IAMReducer, state as IAMstate } from './iam';
import { State as MemberState, MemberDispatch, Action as MemberAction, reducer as MemberReducer, state as Memberstate } from './member';
export type RootState = {
    iam: IAMState;
    member: MemberState;
};
export type RootDispatch =
    & IAMDispatch
    & MemberDispatch
;
export type RootAction =
    | IAMAction
    | MemberAction
;
export const RootState: RootState = {
    iam: IAMstate,
    member: Memberstate,
};
export const RootReducer = ( state: RootState, action: RootAction ): RootState => {
    let result = state;
    [
        IAMReducer,
        MemberReducer,
    ].map( reducer => reducer( state, action ) ).forEach( newstate => {
        if ( newstate !== state ) {
            result = newstate;
        }
    } );
    return result;
};
export const StoreStateContext = React.createContext<RootState | undefined>( undefined );
export const StoreDispatchContext = React.createContext<RootDispatch | undefined>( undefined );
export const MultiContext = React.createContext<{ state: RootState | undefined; dispatch: RootDispatch | undefined } | undefined>( undefined );
export const Provider: React.FC<{  }> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( RootReducer, RootState );
    return (
        <MultiContext.Provider value={ { state, dispatch, } }>
            { children }
        </MultiContext.Provider>
    );
};
export const Consumer: React.FC<{ children: ( { state, dispatch }: { state: RootState | undefined; dispatch: RootDispatch | undefined } ) => ReactNode }> = ( { children } ) => (
    <MultiContext.Consumer>
        { ( obj ) => {
            if ( obj?.state && obj?.dispatch ) {
                return children( { state: obj.state, dispatch: obj.dispatch } );
            } else {
                throw new Error( 'Context Error: Either dispatch or state is missing.' );
            }
        } }
    </MultiContext.Consumer>
);
