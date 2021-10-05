import { AxiosResponse } from 'axios';
import { instance } from './request';
import { IAM } from '@/types';
export const iam = {
    me: async ( jwt: string ): Promise<IAM> => {
        return await instance.get<IAM>( '/iam/me/', {
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
