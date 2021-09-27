import { Guest } from '@/layouts/Root';
import React from 'react';
import { Default, Props as HeadP } from '@/layouts/Default';
interface Props {
    head: HeadP;
}
export class NotFound extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Default { ...this.props.head }></Default>
        );
    }
}
