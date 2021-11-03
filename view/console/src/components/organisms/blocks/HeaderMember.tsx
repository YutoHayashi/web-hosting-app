import React from 'react';
import { Link } from 'react-router-dom';
import { Mdi } from '@/components/atoms/commons/Mdi';
import { Consumer } from '@/store';
import { UserMenu } from './UserMenu';
import { stopPropagation } from '@/services/stopPropagation';
type Props = {}
type States = {
    pullDown: { active: boolean; };
}
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
export const HeaderMember: React.FC<Props> = ( {  } ) => {
    [ state, setState ] = React.useState<States>( { pullDown: { active: false } } );
    const { pullDown } = state;
    return (
        <header className={ `absolute top-0 shadow border-b border-gray-300 flex items-center justify-between px-2 sticky inset-0 bg-white z-20` }>
            <span className={ `cursor-pointer px-2 py-3` }>
                <Mdi icon='view-grid' />
            </span>
            <h1 className={ `mr-auto ml-2 select-none` }><Link to='/'>MOUSE console</Link></h1>
            <div className={ `relative flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 py-3 px-4 rounded` } onClick={ stopPropagation<HTMLDivElement>( e => setState( { pullDown: { active: !pullDown.active } } ) ) }>
                <Consumer>
                    { ( { state } ) => (
                        <p className={ `select-none hidden md:block mr-2` }>{ state?.iam.me.name }</p>
                    ) }
                </Consumer>
                <Mdi icon='menu-down' />
                <img className={ `w-6 h-6 ml-3 rounded-lg object-cover shadow-solid text-teal-400` } src={ '//images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' } />
                <UserMenu active={ pullDown.active } />
            </div>
        </header>
    );
};
