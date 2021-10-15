import { MultiContext, RootDispatch, RootState } from '@/store';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
export type AlertType = 'info' | 'error' | 'warn' | 'success';
interface Props {  }
interface States {
    active: boolean;
    message: ReactNode;
    type: AlertType;
    alert: typeof alert;
    close: typeof close;
}
let state: States;
let setState: Dispatch<SetStateAction<States>> = ( value: SetStateAction<States> ) => null;
let context: {
    state: RootState | undefined;
    dispatch: RootDispatch | undefined;
} | undefined;
const alert: ( args: { message: ReactNode; type: AlertType } ) => void = ( { message, type } ) => {
    setState( { ...state, ...{
        message, type, active: true,
    } } );
};
const close: (  ) => void = (  ) => {
    setState( { ...state, ...{
        message: '', type: 'info', active: false,
    } } );
};
const init: States = {
    active: false,
    message: 'default',
    type: 'info',
    alert,
    close,
};
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
export const AlertManager: React.FC<{ children: ( states: States ) => ReactNode }> = ( { children } ) => (
    <AlertContext.Consumer>
        { ( state ) => children( state ) }
    </AlertContext.Consumer>
);
export const AlertSetter: React.FC<{ children: ( args: { alert: typeof alert, close: typeof close } ) => ReactNode }> = ( { children } ) => (
    <AlertManager>
        { ( { alert, close, } ) => (
            children( { alert, close, } )
        ) }
    </AlertManager>
);
