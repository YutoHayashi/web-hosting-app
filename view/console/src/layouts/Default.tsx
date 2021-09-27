import React from 'react';
export interface Props {
    title: string;
}
export class Default extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { children } = this.props;
        return children;
    }
}
