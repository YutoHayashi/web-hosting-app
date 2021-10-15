import React from 'react';
import { Colors } from '@/types';
import { Mdi } from '../utils/Mdi';
import { Link } from 'react-router-dom';
interface Props {
    className?: string;
    color: Colors;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    submit?: boolean;
    loading?: boolean;
    to?: string;
}
interface States {}
export class Btn extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { className, submit, color, loading, children, onClick, to, } = this.props;
        if ( to ) {
            return (
                <Link to={ to } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-1 px-3 rounded text-white font-bold text-xs ${ className }` }>{ children }</Link>
            );
        } else {
            return (
                <button type={ submit ? 'submit' : 'button' } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-1 px-3 rounded text-white font-bold text-xs ${ className }` } onClick={ onClick }>
                    { loading ? (
                        <Mdi icon='loading' className={ `mdi-spin` }/>
                    ) : children }
                </button>
            );
        }
    }
}
