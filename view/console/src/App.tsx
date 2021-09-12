import React from 'react';
import { ReactRouter, ReactRouterView } from '@/ReactRouter';
export class App extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <ReactRouter>
                <ReactRouterView />
            </ReactRouter>
        );
    }
}

