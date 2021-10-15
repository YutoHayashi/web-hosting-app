import React from 'react';
interface Props {
    title: string;
    required?: boolean;
}
interface States {  }
export class Text extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { title, required = false, } = this.props;
        return (
            <label className={ `inline-block my-5` }>
                <p className={ `text-sm font-bold` }>{ title }&nbsp;:&nbsp;</p>
            </label>
        )
    }
}
