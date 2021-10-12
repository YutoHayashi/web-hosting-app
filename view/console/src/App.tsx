import React from 'react';
import { ReactRouter, ReactRouterView } from '@/ReactRouter';
import { MiddlewareProvider } from './middleware';
export class App extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <MiddlewareProvider>
                <ReactRouter>
                    <ReactRouterView />
                </ReactRouter>
            </MiddlewareProvider>
        );
    }
}
