import { instance } from './request';
import { IAM } from '@/types';
import { Credentials } from './Credentials';
/**
 * Send a login request and receive a JSON Web Token.
 * @param params User's email address and password
 * @returns JSON Web Token
 * @example
 * ```ts
 *  const token = await login( { email, password } );
 * ```
 */
const login: ( params: { email: string; password: string; } ) => Promise<{ token: string; }> = params => {
    const data = new FormData(  );
    ( Object.keys( params ) as ( keyof typeof params )[] ).forEach( k => data.append( k, params[ k ] ) );
    return instance.post<{ token: string }>(
        '/login/',
        data
    )
        .then( response => response.data );
};
/**
 * Send a JSON Web Token and receive user data.
 * @param params JSON Web Token
 * @returns User data
 * @example
 * ```ts
 *  const user = await me( { jwt } );
 * ```
 */
const me: ( params: { jwt: string; } ) => Promise<IAM> = params => {
    const { jwt } = params;
    return instance.get<IAM>(
        '/iam/me/',
        {
            headers: { ...Credentials( { jwt, } ), },
        }
    )
        .then( response => response.data );
};
/**
 * Send JSON Web Token and new user data, and receive updated user data.
 * @param params JSON Web Token and new user data
 * @returns User data
 * @example
 * ```ts
 *  const newuser = await update( { jwt, email, name, organization } );
 * ```
 */
const update: ( params: { jwt: string; } & Pick<IAM, 'email' | 'name' | 'organization'> ) => Promise<IAM> = params => {
    const { jwt } = params;
    const data = new FormData(  );
    ( Object.keys( params ) as ( keyof typeof params )[] ).forEach( k => data.append( k, params[ k ] ) );
    return instance.put<IAM>(
        '/iam/update/',
        {
            headers: { ...Credentials( { jwt, } ), },
            data,
        }
    )
        .then( response => response.data );
};
/**
 * Send a JSON Web Token and receive the logically deleted user data.
 * @param params JSON Web Token
 * @returns Logically deleted user data
 * @example
 * ```ts
 *  const deleteduser = await destroy( { jwt } );
 * ```
 */
const destroy: ( params: { jwt: string; } ) => Promise<IAM> = params => {
    const { jwt } = params;
    return instance.delete<IAM>(
        '/iam/destroy/',
        {
            headers: { ...Credentials( { jwt, } ), },
        }
    )
        .then( response => response.data );
};
export const iam = {
    login,
    me,
    update,
    destroy,
};
