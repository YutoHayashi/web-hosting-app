import { Mdi } from '@/components/atoms/commons/Mdi';
import { AlertSetter } from '@/middleware/Alert';
import { WithAuthentication } from '@/middleware/Auth';
import { stopPropagation } from '@/services/stopPropagation';
import React from 'react';
type Props = {}
export const SignoutButton: React.FC<Props> = ( {  } ) => {
    return (
        <WithAuthentication>
            { ( { logout } ) => (
                <AlertSetter>
                    { ( { alert } ) => (
                        <p className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` } onClick={ stopPropagation<HTMLElement>( e => logout(  ).then( (  ) => alert( { message: 'Signed out.', type: 'info' } ) ) ) } >
                            <Mdi icon='logout' className={ `mr-2` } />
                            Signout
                        </p>
                    ) }
                </AlertSetter>
            ) }
        </WithAuthentication>
    );
};
