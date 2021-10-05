import { IAM } from '@/types';
import { ME, SETME } from './const';
export type Action =
    { type: string; payload?: any }
    & (
        | { type: typeof ME, }
        | { type: typeof SETME, payload: { me: IAM } }
    );
export type State = {
    me: {
        name: string;
        email: string;
        organization: string;
    };
}
