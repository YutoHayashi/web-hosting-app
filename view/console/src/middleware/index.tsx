import React, { ReactNode } from 'react';
import { AlertProvider } from './Alert';
import { AuthProvider } from './Auth';
interface Props {  }
interface States {  }
export class MiddlewareProvider extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return [
            this.props.children,

            AuthProvider,
            AlertProvider,

        ].reduce( ( Previous: ReactNode, Current: ReactNode ) => ( <Current children={ Previous } /> ), );
    }
}
