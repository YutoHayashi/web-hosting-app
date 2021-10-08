import React from 'react';
import { Link } from 'react-router-dom';
import { Mdi } from '@/components/utils/Mdi';
import { Consumer } from '@/store';
interface Props {
    active: boolean;
}
interface States {
    switchAccount: {
        formArea: {
            active: boolean
        }
    }
}
export class UserMenu extends React.Component<Props, States> {
    public stopUlClickEvent: React.MouseEventHandler<HTMLUListElement> = e => e.stopPropagation(  );
    public toggleSwitchAccount: React.MouseEventHandler<HTMLParagraphElement> = e => {
        console.log( 'toggle account' );
        this.setState( {
            switchAccount: {
                formArea: {
                    active: !this.state.switchAccount.formArea.active,
                }
            }
        } )
    }
    public constructor( props: Props ) {
        super( props );
        this.state = {
            switchAccount: {
                formArea: {
                    active: false,
                },
            },
        };
    }
    public render(  ) {
        const { active } = this.props;
        const { switchAccount } = this.state;
        return (
            <ul className={ `${ active ? 'block' : 'hidden' } shadow absolute top-full right-0 py-5 min-w-full bg-white` } onClick={ this.stopUlClickEvent }>
                <Consumer>
                    { ( { state } ) => (
                        <li className={ `whitespace-nowrap px-2 py-2 text-md mb-2` }>OrganizationID: <br /><a href="" className={ `underline text-blue-500 hover:text-blue-600` } >{ state?.me.organization }</a></li>
                    ) }
                </Consumer>
                <li className={ `select-none` }>
                    <p className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` } onClick={ this.toggleSwitchAccount.bind( this ) }>
                        <Mdi icon='account-switch' className={ `mr-2` } />Switch Account
                    </p>
                    <div className={ `${ switchAccount.formArea.active ? 'py-2' : 'h-0' } overflow-y-hidden transition duration-150 px-2 text-right` }>
                        <label className={ `block mb-1 text-left` }>
                            <p className={ `text-sm text-gray-700` }>Email: </p>
                            <input type="text" className={ `rounded outline-none focus:shadow-outline border border-blue-500 focus:border-blue-400 hover:border-blue-400 text-sm py-1 w-full cursor-pointer` } />
                        </label>
                        <label className={ `block mb-1 text-left` }>
                            <p className={ `text-sm text-gray-700` }>Password: </p>
                            <input type="password" className={ `rounded outline-none focus:shadow-outline border border-blue-500 focus:border-blue-400 hover:border-blue-400 text-sm py-1 w-full cursor-pointer` } />
                        </label>
                        <button className={ `text-white bg-blue-500 hover:bg-blue-400 rounded py-1 px-5 text-sm` }>Logout and Switch</button>
                    </div>
                </li>
                <li>
                    <Link to='/settings' className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }>
                        <Mdi icon='tune' className={ `mr-2` } />Settings
                    </Link>
                </li>
                <li>
                    <Link to='/signout' className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }>
                        <Mdi icon='logout' className={ `mr-2` } />Signout
                    </Link>
                </li>
            </ul>
        );
    }
};
