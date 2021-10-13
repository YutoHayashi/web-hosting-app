import { Mdi } from '@/components/utils/Mdi';
import { AlertSetter } from '@/middleware/Alert';
import { WithAuthentication } from '@/middleware/Auth';
import { stopPropagation } from '@/services/stopPropagation';
import React from 'react';
interface Props {  }
interface States {  }
export class SignoutBtn extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <WithAuthentication>
                { ( { logout } ) => (
                    <AlertSetter>
                        { ( { alert } ) => (
                            <p
                                className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }
                                onClick={ stopPropagation<HTMLElement>( e => logout(  ).then( (  ) => alert( { message: 'Signed out.', type: 'info' } ) ) ) }
                            >
                                <Mdi
                                    icon='logout'
                                    className={ `mr-2` }
                                />
                                Signout
                            </p>
                        ) }
                    </AlertSetter>
                ) }
            </WithAuthentication>
        )
    }
}
