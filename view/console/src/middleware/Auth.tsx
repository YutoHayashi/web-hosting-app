import { iam } from '@/request/iam';
import { cookie } from '@/services/cookie';
import { MultiContext, RootDispatch, RootState } from '@/store';
import { SETME } from '@/store/iam';
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
const contextError = (  ) => {
    throw new Error( 'Context Error: Either dispatch or state is missing.' );
}
const setme: ( args: { token: string } ) => Promise<void> = async ( { token } ) => {
    return iam.me( { jwt: token } ).then( me => {
        if ( context && context.dispatch ) {
            context.dispatch( { type: SETME, payload: { me, }, } );
            setState( { ...state, ...{ isAuthenticated: true, token: token, }, } );
        } else contextError(  );
    } );
};
const login: ( params?: { email?: string; password?: string, } ) => Promise<void> = async ( { email = '', password = '', } = { email: '', password: '', } ) => {
    return new Promise( ( resolve ) => {
        try {
            const cookieToken: string = cookie.get( { key: 'mouse_console_jwt' } );
            if ( cookieToken ) {
                setme( { token: cookieToken, } );
            } else {
                iam.login( { email, password } ).then( ( { token } ) => {
                    cookie.set( { key: 'mouse_console_jwt', value: token } );
                    setme( { token, } );
                } );
            }
        } finally {
            resolve(  );
        }
    } );
}
const change: ( params?: { email?: string; password?: string } ) => Promise<void> = async ( { email = '', password = '', } = { email: '', password: '' } ) => {
    return iam.login( { email, password } ).then( ( { token } ) => {
        cookie.set( { key: 'mouse_console_jwt', value: token } );
        setme( { token } );
    } );
};
const logout: (  ) => void = (  ) => {
    cookie.delete( { key: 'mouse_console_jwt' } );
    setState( { ...state, ...{ isAuthenticated: false, }, } );
    if ( context && context.dispatch ) {
        context.dispatch( { type: SETME, payload: { me: { email: '', name: '', organization: '', }, }, } );
    } else contextError(  );
};
const init: States = { isAuthenticated: false, token: '', login, change, logout, };
export const LoginContext = createContext<States>( init );
export const AuthProvider: React.FC<Props> = ( { children } ) => {
    [ state, setState ] = useState<States>( init );
    context = useContext( MultiContext );
    return (
        <LoginContext.Provider value={ state }>
            { children }
        </LoginContext.Provider>
    );
}
/**
 * 認証に関係する箇所をラップする
 * 以下の場合で再レンダリングされる。
 * 1. ログインしたとき
 * 2. ログインユーザーが変わったとき
 * \
 * childrenの引数には以下のパラメータが入っている\
 * isAuthenticated: 認証されているかどうか。ログイン時または、ログインユーザー切り替え時にtureが入るようになっている。\
 * token: 認証用のjwt\
 * login: ログイン用の関数 ( { email, password } ) => void;\
 * change: ログインユーザー切り替え用の関数 ( { email, password } ) => void;
 * @param param0 
 * @returns ReactNode
 */
export const WithAuthentication: React.FC<{ children: ( states: States ) => ReactNode }> = ( { children } ) => {
    return (
        <LoginContext.Consumer>
            { ( states ) => children( states ) }
        </LoginContext.Consumer>
    );
};
