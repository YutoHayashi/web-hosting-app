import { AxiosResponse } from 'axios';
import { instance } from './request';
type MeType = { name: string; email: string; organization: string; };
export const iam = {
    me: async ( jwt: string ): Promise<MeType> => {
        return await instance.get<MeType>( '/iam/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        } )
            .then( response => response.data )
        ;
    },
    update: async (  ): Promise<any> => {
        return await instance.put<any>( '/iam/update/', {
            //
        } );
    },
    destroy: async (  ): Promise<any> => {
        return await instance.delete<any>( '/iam/destroy/', {
            //
        } );
    },
}
