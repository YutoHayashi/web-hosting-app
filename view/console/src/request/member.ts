import { AxiosResponse } from 'axios';
import { instance } from './request';
import { IAM } from '@/types';
const BASE_URL = '/iam/member';
export const member = {
    index: async ( params: { jwt: string; } ): Promise<IAM[]> => {
        const { jwt } = params;
        return await instance.get<{ results: IAM[]; }>( `${ BASE_URL }/index/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        }, )
            .then( response => response.data.results )
            .catch( e => Promise.reject( e ) );
    },
    add: async ( params: { organization: string, name: string; email: string; password: string, jwt: string; } ): Promise<IAM> => {
        const { organization, name, email, password, jwt } = params;
        const fd = new FormData(  );
        fd.append( 'organization', organization );
        fd.append( 'name', name );
        fd.append( 'email', email );
        fd.append( 'password', password );
        return await instance.post<{ results: IAM; }>( `${ BASE_URL }/register/`, fd, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        } )
            .then( response => response.data.results )
            .catch( e => Promise.reject( e ) );
    },
    destroy: async ( params: { email: string, jwt: string } ): Promise<IAM> => {
        const { email, jwt } = params;
        const fd = new FormData(  );
        fd.append( 'email', email );
        return await instance.delete<IAM>( `${ BASE_URL }/destroy/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
            data: fd,
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
    update: async ( params: { email: string; jwt: string; } & { [ Key in keyof Omit<IAM, 'email'> ]: Omit<IAM, 'email'>[ Key ]; } ): Promise<IAM> => {
        const { email, jwt } = params;
        const fd = new FormData(  );
        fd.append( 'email', email );
        return await instance.put<IAM>( `${ BASE_URL }/update/`, fd, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    }
};
