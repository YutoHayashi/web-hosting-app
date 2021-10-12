import { MultiContext, RootDispatch, RootState } from '@/store';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
interface Props {  }
interface States {  }
let state: States;
let setState: Dispatch<SetStateAction<States>> = ( value: SetStateAction<States> ) => null;
let context: {
    state: RootState | undefined;
    dispatch: RootDispatch | undefined;
} | undefined;
const contextError = (  ) => {
    throw new Error( 'Context Error: Either dispatch or state is missing.' );
};
const init: States = {  };
export const AlertContext = createContext<States>( init );
export const AlertProvider: React.FC<Props> = ( { children } ) => {
    [ state, setState ] = useState<States>( init );
    context = useContext( MultiContext );
    return (
        <AlertContext.Provider value={ state }>
            { children }
        </AlertContext.Provider>
    );
};
export const AlertManager: React.FC<{ children: ( states: States ) => ReactNode }> = ( { children } ) => {
    return (
        <AlertContext.Consumer>
            { ( state ) => children( state ) }
        </AlertContext.Consumer>
    );
};
