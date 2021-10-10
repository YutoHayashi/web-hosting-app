import React from 'react';
import { LoginProvider } from './Login';
interface Props {  }
const Providers: React.FunctionComponent[] = [
    LoginProvider,
]
export const ServiceProvider: React.FC<Props> = ( { children } ) => {
    return <>
        { [ ...Providers, children ].reduce( ( Previous, Current ) => {
            return ( <Previous children={ Current } /> );
        }, ) }
    </>;
}
