import { instance } from './request';
import { IAM } from '@/types';
import { Credentials } from './Credentials';
const BASE_URL = '/iam/member';
export const member = {
    index: async ( params: { jwt: string; } ): Promise<IAM[]> => {
        const { jwt } = params;
        return await instance.get<{ results: IAM[]; }>( `${ BASE_URL }/index/`, {
            headers: { ...Credentials( { jwt } ) },
        }, )
            .then( response => response.data.results )
            .catch( e => Promise.reject( e ) );
    },
    add: async ( params: { jwt: string; } & Pick<IAM, 'name' | 'email' | 'organization'> & { password: string; } ): Promise<IAM> => {
        const { jwt } = params;
        const fd = new FormData(  );
        ( Object.keys( params ) as ( keyof Omit<Parameters<typeof member.add>[ 0 ], 'jwt'> )[] ).forEach( k => fd.append( k, params[ k ] ) );
        return await instance.post<{ results: IAM; }>( `${ BASE_URL }/register/`, fd, {
            headers: { ...Credentials( { jwt } ) },
        } )
            .then( response => response.data.results )
            .catch( e => Promise.reject( e ) );
    },
    destroy: async ( params: { email: string, jwt: string } ): Promise<IAM> => {
        const { email, jwt } = params;
        const fd = new FormData(  );
        fd.append( 'email', email );
        return await instance.delete<IAM>( `${ BASE_URL }/destroy/`, {
            headers: { ...Credentials( { jwt } ) },
            data: fd,
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
    update: async ( params: { email: string; jwt: string; } & Partial<Pick<IAM, 'name' | 'is_root'>> & { password?: string; } ): Promise<IAM> => {
        const { jwt } = params;
        const fd = new FormData(  );
        ( Object.keys( params ) as ( keyof Omit<Parameters<typeof member.update>[ 0 ], 'jwt'> )[] ).forEach( k => fd.append( k, params[ k ] as string | Blob ) );
        return await instance.put<IAM>( `${ BASE_URL }/update/`, fd, {
            headers: { ...Credentials( { jwt } ) },
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
    show: async ( params: { id: string; jwt: string } ): Promise<IAM> => {
        const { id, jwt } = params;
        return await instance.get<IAM>( `${ BASE_URL }/show/${ id }/`, {
            headers: { ...Credentials( { jwt } ) },
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
};
