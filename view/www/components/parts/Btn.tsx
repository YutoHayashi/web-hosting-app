import React from 'react';
import { Colors } from '@/types';
import { Mdi } from '../utils/Mdi';
interface Props {
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
        const { submit, color, loading, children, onClick } = this.props;
        return (
            <button type={ submit ? 'submit' : 'button' } className={ `bg-${ color }-500 hover:bg-${ color }-400 block py-3 my-5 rounded text-white font-bold` } onClick={ onClick }>
                { loading ? (
                    <p>
                        <Mdi icon='loading' className={ `mdi-spin` }/>
                    </p>
                ) : children }
            </button>
        );
    }
}
