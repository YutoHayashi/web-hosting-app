import { AxiosResponse } from 'axios';
import { instance } from './request';
export const root = {
    me: async (  ): Promise<any> => {
        return await instance.get<any>( '/iam/me/', {
            //
        } );
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
export const member = {
    create: async (  ): Promise<any> => {
        return await instance.post<any>( '/iam/member/register/', {
            //
        } );
    },
    update: async (  ): Promise<any> => {
        return await instance.put( '/iam/member/update/', {
            //
        } );
    },
    destroy: async (  ): Promise<any> => {
        return await instance.delete( '/iam/member/destroy/', {
            //
        } );
    },
};
