import React from 'react';
interface Props {
    submit?: boolean;
    className?: string;
}
export class Button extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { submit = false, className, children } = this.props;
        return (
            <button type={ submit ? 'submit' : 'button' } className={ `px-5 py-2 rounded overflow-hidden focus:outline-none focus:shadow-outline transition ease-out duration-200 bg-blue-400 hover:bg-blue-500 text-white text-sm lg:text-base ${ className || '' }` }>{ children || 'noname' }</button>
        );
    }
}
