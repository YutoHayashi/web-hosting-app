import React from 'react';
import { Link } from 'react-router-dom';
import { Mdi } from '@/components/utils/Mdi';
interface Props {  }
interface States {
    pullDown: { value: boolean; };
}
export class HeaderMember extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            pullDown: { value: false, }
        };
    }
    public togglePullDown(  ) {
        const current = this.state.pullDown.value;
        const next = !current;
        this.setState( { ...Object.assign( this.state ), ...{
            pullDown: {
                value: next,
            }
        } } );
    }
    public pullDownClicked: React.MouseEventHandler<HTMLDivElement> = e => {
        this.togglePullDown(  );
    }
    public render(  ) {
        const { pullDown } = this.state;
        return (
            <header className={ `absolute top-0 shadow flex items-center justify-between px-2 sticky inset-0 bg-white z-20` }>
                <span className={ `cursor-pointer px-2 py-3` }>
                    <Mdi icon='view-grid' />
                </span>
                <h1 className={ `mr-auto ml-2 select-none` }>MOUSE console</h1>
                <div className={ `relative flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 py-3 px-4 rounded` } onClick={ this.togglePullDown.bind( this ) }>
                    <p className={ `select-none hidden md:block` }>organizationname</p>
                    <Mdi icon='menu-down' />
                    <img className={ `w-6 h-6 ml-3 rounded-lg object-cover shadow-solid text-teal-400` } src={ '//images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' } />

                    <ul className={ `${ pullDown.value ? 'block' : 'hidden' } shadow absolute top-full right-0 py-5 min-w-full bg-white` }>
                        <li className={ `whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }>
                            <Link to='/settings'>
                                <Mdi icon='tune' className={ `mr-2` } />Settings
                            </Link>
                        </li>
                        <li className={ `whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }>
                            <Link to='/logout'>
                                <Mdi icon='logout' className={ `mr-2` } />Logout
                            </Link>
                        </li>
                    </ul>

                </div>
            </header>
        );
    }
}
