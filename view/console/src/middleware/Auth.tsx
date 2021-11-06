import { iam } from '@/request/iam';
import { cookie } from '@/services/cookie';
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
export const TOKEN_NAME = 'mouse_console_jwt';
const me: ( args: { token: string } ) => Promise<void> = async ( { token } ) => {
    return iam.me( { jwt: token } )
        .then( me => {
            setState( { ...state, ...{ isAuthenticated: true, token: token, }, } );
            Promise.resolve(  );
        } )
        .catch( e => Promise.reject( e ) );
};
const login: ( params?: { email?: string; password?: string, } ) => Promise<void> = async ( { email = '', password = '', } = { email: '', password: '', } ) => {
    if ( email !== '' && password !== '' ) {
        iam.login( { email, password } )
            .then( ( { token } ) => {
                cookie.set( { key: TOKEN_NAME, value: token } );
                me( { token, } )
                    .catch( e => Promise.reject( e ) );
            } )
            .catch( e => Promise.reject( e ) );
    } else {
        const token: string = cookie.get( { key: TOKEN_NAME } );
        if ( token ) me( { token, } )
            .catch( e => Promise.reject( e ) );
    }
    Promise.resolve(  );
}
const change: ( params: { email: string; password: string } ) => Promise<void> = async ( { email, password, } ) => {
    logout(  )
        .then( (  ) => login( { email, password } ) )
        .catch( e => Promise.reject( e ) );
    Promise.resolve(  );
};
const logout: (  ) => Promise<void> = async (  ) => {
    cookie.delete( { key: TOKEN_NAME } );
    setState( { ...state, ...{ isAuthenticated: false, }, } );
    Promise.resolve(  );
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
( function trytologin(  ) {
    login(  );
} )(  );
