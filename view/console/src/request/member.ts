import { AxiosResponse } from 'axios';
import { instance } from './request';
import { IAM } from '@/types';
export const member = {
    index: async ( { jwt }: { jwt: string; } ): Promise<{ results: IAM[]; }> => {
        return await instance.get<{ results: IAM[] }>( '/iam/member/index/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ jwt }`,
            },
        }, )
            .then( response => response.data )
        ;
    },
};
