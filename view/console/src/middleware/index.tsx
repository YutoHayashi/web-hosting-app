import React, { ReactNode } from 'react';
import { AuthProvider } from './Auth';
interface Props {  }
interface States {  }
export class MiddlewareProvider extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return [

            AuthProvider,

            this.props.children,
        ].reduce( ( Nodep: ReactNode, Nodec: ReactNode ) => ( <Nodep children={ Nodec } /> ), );
    }
}
