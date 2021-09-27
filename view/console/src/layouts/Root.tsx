import React from 'react';
import { Link } from 'react-router-dom';
import { Default, Props as HeadP } from './Default';
import { Logo } from '@/components/parts/Logo';
interface Props {
    head: HeadP;
}
export class Guest extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { children } = this.props;
        return (
            <Default { ...this.props.head }>
                <header className={ `flex items-center justify-center py-5 sticky inset-0 bg-white` }>
                    <Link to={ `/` }>
                        <Logo />
                    </Link>
                </header>
                <main className={ `max-w-screen-xl mx-auto py-5 px-0 md:px-5` }>
                    { children }
                </main>
            </Default>
        );
    }
}
