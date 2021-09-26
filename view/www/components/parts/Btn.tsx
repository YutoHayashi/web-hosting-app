import React from 'react';
import { Colors } from '@/types';
import { Mdi } from '../utils/Mdi';
import { i18nProps } from '@/types';
import Link from 'next/link';
interface Props extends i18nProps {
    color: Colors;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    submit?: boolean;
    loading?: boolean;
    className?: string;
    href?: string;
}
interface States {}
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
export class Btn extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { submit, color, loading, children, onClick, className, href } = this.props;
        if ( href !== undefined ) {
            return (
                <Link href={ href }>
                    <a className={ `bg-${ color }-500 hover:bg-${ color }-400 inline-block text-center py-3 my-3 rounded text-white font-bold text-md ${ className }` }>
                        { children }
                    </a>
                </Link>
            );
        } else {
            return (
                <button type={ submit ? 'submit' : 'button' } className={ `bg-${ color }-500 hover:bg-${ color }-400 inline-block text-center py-3 my-5 rounded text-white font-bold text-md ${ className }` } onClick={ onClick }>
                    { loading ? (
                        <p>
                            <Mdi icon='loading' className={ `mdi-spin` }/>
                        </p>
                    ) : children }
                </button>
            );
        }
    }
}
