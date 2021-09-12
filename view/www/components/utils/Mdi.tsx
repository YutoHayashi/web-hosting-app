// https://materialdesignicons.com/
import React from 'react';
interface Props {
    icon: string;
    className?: string;
}
export class Mdi extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { icon, className } = this.props;
        return (
            <i className={ `${ className || '' } mdi mdi-${ icon }` }></i>
        );
    }
}
