import { AxiosResponse } from 'axios';
import { instance } from './request';
import { IAM } from '@/types';
export const iam = {
    me: async ( { jwt }: { jwt: string; } ): Promise<IAM> => {
        return await instance.get<IAM>( '/iam/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        } )
            .then( response => response.data )
        ;
    },
    login: async ( { email, password }: { email: string; password: string } ): Promise<{ token: string; }> => {
        const data = new FormData(  );
        data.append( 'email', email );
        data.append( 'password', password );
        return await instance.post<{ token: string }>( '/login/', data ).then( response => response.data );
    },
    update: async ( { jwt, organization, data = {  } }: { jwt: string; organization: string; data: Partial<IAM> } ): Promise<IAM> => {
        const fd = new FormData(  );
        fd.append( 'organization', organization );
        Object.keys( data ).forEach( iamkey => fd.append( `${ iamkey }`, data[ iamkey ] ) );
        return await instance.put<IAM>( '/iam/update/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
            data: fd,
        } )
            .then( response => response.data )
        ;
    },
    destroy: async (  ): Promise<any> => {
        return await instance.delete<any>( '/iam/destroy/', {
            //
        } );
    },
}
