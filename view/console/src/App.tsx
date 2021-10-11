import React from 'react';
import { ReactRouter, ReactRouterView } from '@/ReactRouter';
import { AuthProvider } from '@/middleware/Auth';
export class App extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <AuthProvider>
                <ReactRouter>
                    <ReactRouterView />
                </ReactRouter>
            </AuthProvider>
        );
    }
}
