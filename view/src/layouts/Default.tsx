import React from 'react';
import { Alert } from '@/components/Alert';
export class Default extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <>
                <Alert type='danger'></Alert>
                <main>
                    { this.props.children }
                </main>
            </>
        );
    }
}
