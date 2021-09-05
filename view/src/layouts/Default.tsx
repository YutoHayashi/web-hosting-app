import React from 'react';
export class Default extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <>
                { this.props.children }
            </>
        );
    }
}
