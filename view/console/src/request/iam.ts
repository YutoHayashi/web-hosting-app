import { instance } from './request';
import { IAM } from '@/types';
const Credentials = ( args: { jwt: string; } ) => ( {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${ args.jwt }`,
} );
export const iam = {
    me: async ( { jwt }: { jwt: string; } ): Promise<IAM> => {
        return await instance.get<IAM>( '/iam/me/', {
            headers: { ...Credentials( { jwt } ) },
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
        ;
    },
    login: async ( { email, password }: { email: string; password: string } ): Promise<{ token: string; }> => {
        const data = new FormData(  );
        data.append( 'email', email );
        data.append( 'password', password );
        return await instance.post<{ token: string }>( '/login/', data )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
    update: async ( { jwt, organization, data = {  } }: { jwt: string; organization: string; data: Partial<IAM> } ): Promise<IAM> => {
        const fd = new FormData(  );
        fd.append( 'organization', organization );
        ( Object.keys( data ) as ( keyof IAM )[] ).forEach( iamkey => fd.append( `${ iamkey }`, data[ iamkey ] as string | Blob ) );
        return await instance.put<IAM>( '/iam/update/', {
            headers: { ...Credentials( { jwt } ) },
            data: fd,
        } )
            .then( response => response.data )
            .catch( e => Promise.reject( e ) );
    },
    destroy: async (  ): Promise<any> => {
        return await instance.delete<any>( '/iam/destroy/', {
            //
        } );
    },
}
