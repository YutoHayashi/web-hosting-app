import React from 'react';
import { Link } from 'react-router-dom';
import { Mdi } from '@/components/utils/Mdi';
import { Consumer } from '@/store';
import { UserMenu } from './UserMenu';
import { stopPropagation } from '@/services/stopPropagation';
interface Props {  }
interface States {
    pullDown: { active: boolean; };
}
export class HeaderMember extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            pullDown: { active: false, }
        };
    }
    public togglePullDown(  ) {
        const current = this.state.pullDown.active;
        const next = !current;
        this.setState( { ...Object.assign( this.state ), ...{
            pullDown: {
                active: next,
            }
        } } );
    }
    public pullDownClicked( e: React.MouseEvent<HTMLDivElement> ) {
        this.togglePullDown(  );
    }
    public render(  ) {
        const { pullDown } = this.state;
        return (
            <header className={ `absolute top-0 shadow flex items-center justify-between px-2 sticky inset-0 bg-white z-20` }>
                <span className={ `cursor-pointer px-2 py-3` }>
                    <Mdi icon='view-grid' />
                </span>
                <h1 className={ `mr-auto ml-2 select-none` }><Link to='/'>MOUSE console</Link></h1>
                <div className={ `relative flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 py-3 px-4 rounded` } onClick={ stopPropagation<HTMLDivElement>( this.pullDownClicked.bind( this ) ) }>
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
    }
}
