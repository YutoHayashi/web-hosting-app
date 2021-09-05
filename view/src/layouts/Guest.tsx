import React from 'react';
import { Link } from 'react-router-dom';
import { Default } from './Default';
import { Logo } from '@/components/parts/Logo';
export class Guest extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        const { children } = this.props;
        return (
            <Default>
                <header className={ `flex items-center justify-center py-5` }>
                    <Link to={ `/` }>
                        <Logo />
                    </Link>
                </header>
                <main className={ `max-w-screen-xl mx-auto p-5` }>
                    { children }
                </main>
            </Default>
        );
    }
}
