import { IAM } from '@/types';
import { iam } from '@/request/iam';
import { MultiContext } from '@/store';
import { SETME, SETTOKEN } from '@/store/iam';
import { cookie } from '@/utils/cookie';
import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
type login = ( params?: { email: string; password: string } ) => void;
interface Props {  }
interface States {
    login: login;
    isAuthenticated: boolean;
    token: string;
}
export const LoginContext = createContext<States | undefined>( undefined );
export const LoginProvider: React.FC<Props> = ( { children } ) => {
    let state: States;
    let setState: React.Dispatch<React.SetStateAction<States>>;
    const setToken = ( { token }: { token: string; } ) => {
        if ( context && context.dispatch ) {
            context.dispatch( { type: SETTOKEN, payload: { token, }, } );
            setState( { ...state, ...{ token, isAuthenticated: true, }, } );
        } else contextError(  );
    };
    const setMe = ( { token }: { token: string; } ) => {
        iam.me( { jwt: token } ).then( ( me ) => {
            if ( context && context.dispatch ) {
                context.dispatch( { type: SETME, payload: { me, }, } );
            } else contextError(  );
        } );
    };
    const login: ( params?: { email: string; password: string; } ) => void = ( { email, password } = { email: '', password: '' } ) => {
        if ( state.isAuthenticated ) {
            const token = cookie.get( { key: 'mouse_console_jwt' } );
            if ( token ) {
                setToken( { token, } );
            } else {
                // cookieにtokenがない状態（Logoutor期限切れ）
                iam.login( { email, password } ).then( ( { token } ) => cookie.set( { key: 'mouse_console_jwt', value: token } ) ).then( (  ) => {
                    setToken( { token, } );
                    setMe( { token, } );
                } );
            }
        }
    };
    [ state, setState ] = useState<States>( { isAuthenticated: false, token: '', login: (  ) => null } );
    const context = useContext( MultiContext );
    const contextError: (  ) => never = (  ) => {
        throw new Error( 'Context Error: Either dispatch or state is missing.' );
    };
    return (
        <LoginContext.Provider value={ state }>
            { children }
        </LoginContext.Provider>
    );
}
export const WatchIAM: React.FC<{ children: ( state: States ) => ReactNode }> = ( { children } ) => {
    return <LoginContext.Consumer>
        { ( state ) => {
            if ( state ) {
                return children( state );
            }
        } }
    </LoginContext.Consumer>
}
