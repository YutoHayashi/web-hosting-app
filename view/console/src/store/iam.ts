import { Reducer, Action } from 'redux';
import { iam } from '@/request/iam';
export const GETME = '@get:iam/me';
export type state = {
    me: { name: string; email: string; organization: string; };
};
export const init = {
    me: { name: '', email: '', organization: '', },
};
export const action = {
    getme: (  ) => ( { type: GETME, payload: `${ 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIiwiZXhwIjoxNjMzMTI4MzMxLCJlbWFpbCI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIn0.vk0l7ep0GkmNzPVmQxmLqGuJnWQrxSLFft056v1jYI8' }`, } ),
};
export type actionTypes = typeof GETME;
export const reducer = async ( state = init, action: Action<actionTypes> ) => {
    switch( action.type ) {
        case GETME:
            return await iam.me( action.payload ).then( me => {
                return { ...state, me, };
            } );
    }
}
