import { iam } from '@/request/iam';
import { cookie } from '@/services/cookie';
import { MultiContext, RootDispatch, RootState } from '@/store';
import { CLEAR, SETME } from '@/store/iam';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
interface Props {  }
interface States {
    isAuthenticated: boolean;
    token: string;
    login: typeof login;
    change: typeof change;
    logout: typeof logout;
}
let state: States;
let setState: Dispatch<SetStateAction<States>> = ( value: SetStateAction<States> ) => null;
let context: {
    state: RootState | undefined;
    dispatch: RootDispatch | undefined;
} | undefined;
export const TOKEN_NAME = 'mouse_console_jwt';
const me: ( args: { token: string } ) => Promise<void> = async ( { token } ) => {
    try {
        iam.me( { jwt: token } ).then( me => {
            if ( context && context.dispatch ) {
                context.dispatch( { type: SETME, payload: { me, }, } );
                setState( { ...state, ...{ isAuthenticated: true, token: token, }, } );
            }
        } );
    } finally {
        Promise.resolve(  );
    }
};
const login: ( params?: { email?: string; password?: string, } ) => Promise<void> = async ( { email = '', password = '', } = { email: '', password: '', } ) => {
    try {
        if ( email !== '' && password !== '' ) {
            iam.login( { email, password } ).then( ( { token } ) => {
                cookie.set( { key: TOKEN_NAME, value: token } );
                me( { token, } );
            } );
        } else {
            const token: string = cookie.get( { key: TOKEN_NAME } );
            if ( token ) me( { token, } )
        }
    } finally {
        return Promise.resolve(  );
    }
}
const change: ( params: { email: string; password: string } ) => Promise<void> = async ( { email, password, } ) => {
    try {
        logout(  ).then( (  ) => login( { email, password } ) );
    } finally {
        return Promise.resolve(  );
    }
};
const logout: (  ) => Promise<void> = async (  ) => {
    try {
        cookie.delete( { key: TOKEN_NAME } );
        setState( { ...state, ...{ isAuthenticated: false, }, } );
        if ( context && context.dispatch ) context.dispatch( { type: CLEAR, } );
    } finally {
        return Promise.resolve(  );
    }
};
const init: States = { isAuthenticated: false, token: '', login, change, logout, };
export const AuthContext = createContext<States>( init );
/**
 * 認証関係のミドルウェアを提供。
 * @param param0 
 * @returns reactNode
 */
export const AuthProvider: React.FC<Props> = ( { children } ) => {
    [ state, setState ] = useState<States>( init );
    context = useContext( MultiContext );
    return (
        <AuthContext.Provider value={ state }>
            { children }
        </AuthContext.Provider>
    );
}
export const AuthManager: React.FC<{ children: ( state: States ) => ReactNode }> = ( { children } ) => (
    <AuthContext.Consumer>
        { ( state ) => children( state ) }
    </AuthContext.Consumer>
)
/**
 * 認証が必要な箇所
 * @param param0 
 * @returns 
 */
export const WithAuthentication: React.FC<{ children: ( args: { logout: typeof logout, token: string } ) => ReactNode }> = ( { children } ) => (
    <AuthManager>
        { ( state ) => {
            const { logout, token } = state;
            if ( state.isAuthenticated ) {
                return children( { logout, token } );
            } else return <></>;
        } }
    </AuthManager>
);
/**
 * 認証の必要がない箇所
 * @param param0 
 * @returns 
 */
export const WithoutAuthentication: React.FC<{ children: ( args: { change: typeof change, login: typeof login } ) => ReactNode }> = ( { children } ) => (
    <AuthManager>
        { ( { change, login } ) => children( { change, login } ) }
    </AuthManager>
);
( function autologin(  ) {
    login(  );
} )(  );
