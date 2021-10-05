import React, { useContext, useReducer, ReactNode } from 'react';
import { RootReducer } from './reducers';
import { RootState } from './state';
import * as Types from './types';
export const StoreStateContext = React.createContext<Types.RootState | undefined>( undefined );
export const StoreDispatchContext = React.createContext<Types.RootDispatch | undefined>( undefined );
export const Provider: React.FC<{  }> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( RootReducer, RootState );
    return (
        <StoreDispatchContext.Provider value={ dispatch }>
            <StoreStateContext.Provider value={ state }>
                { children }
            </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
    );
};
export const Consumer: React.FC<{ children: ( dispatch: Types.RootDispatch | undefined, state: Types.RootState | undefined ) => ReactNode }> = ( { children } ) => {
    return (
        <StoreDispatchContext.Consumer>
            { ( dispatch ) => (
                <StoreStateContext.Consumer>
                    { ( state ) => (
                        children( dispatch, state )
                    ) }
                </StoreStateContext.Consumer>
            ) }
        </StoreDispatchContext.Consumer>
    );
};
