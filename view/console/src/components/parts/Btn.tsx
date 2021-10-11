import React from 'react';
import { Colors } from '@/types';
import { Mdi } from '../utils/Mdi';
interface Props {
    className?: string;
    color: Colors;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    submit?: boolean;
    loading?: boolean;
}
interface States {}
export class Btn extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { className, submit, color, loading, children, onClick } = this.props;
        return (
            <button type={ submit ? 'submit' : 'button' } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-1 px-5 rounded text-white font-bold text-xs md:text-sm ${ className }` } onClick={ onClick }>
                { loading ? (
                    <Mdi icon='loading' className={ `mdi-spin` }/>
                ) : children }
            </button>
        );
    }
}
