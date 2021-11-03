import React from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '@/types';
import { Mdi } from './Mdi';
type Props = {
    className?: string;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    submit?: boolean;
    loading?: boolean;
    to?: string;
}
export const Btn: React.FC<Props> = ( { className = '', color = 'blue', onClick, submit = false, loading = false, to = undefined, children } ) => {
    if ( to ) {
        return <Link to={ to } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-1 px-3 rounded text-white font-base text-xs ${ className }` }>{ children }</Link>
    } else {
        return (
            <button type={ submit ? 'submit' : 'button' } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-1 px-3 rounded text-white text-sm ${ className }` } onClick={ onClick }>
                { loading ? (
                    <Mdi icon='loading' className={ `mdi-spin` }/>
                ) : children }
            </button>
        );
    }
};
