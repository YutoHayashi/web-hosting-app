import React from 'react';
import { ReactRouter, ReactRouterView } from '@/ReactRouter';
import { LoginProvider } from './services/Login';
export class App extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <LoginProvider>
                <ReactRouter>
                    <ReactRouterView />
                </ReactRouter>
            </LoginProvider>
        );
    }
}
