import React from 'react';
import { Link } from 'react-router-dom';
import { Mdi } from '@/components/utils/Mdi';
import { MultiContext } from '@/store';
import { stopPropagation } from '@/services/stopPropagation';
import { IAMConsumer, SETME, SETTOKEN } from '@/store/iam';
import { iam } from '@/request/iam';
import { cookie } from '@/services/cookie';
import { SwitchAccountBtn } from './molecules/SwitchAccountBtn';
import { SignoutBtn } from './molecules/SignoutBtn';
interface Props {
    active: boolean;
}
interface States {
    switchAccount: {
        formArea: {
            active: boolean;
        };
    };
    loading: boolean;
}
export class UserMenu extends React.Component<Props, States> {
    public static contextType = MultiContext;
    private email: React.RefObject<HTMLInputElement>;
    private password: React.RefObject<HTMLInputElement>;
    public constructor( props: Props ) {
        super( props );
        this.state = {
            switchAccount: {
                formArea: {
                    active: false,
                },
            },
            loading: false,
        };
        this.email = React.createRef(  );
        this.password = React.createRef(  );
    }
    public clickSwitchAccount( e: React.MouseEvent<HTMLParagraphElement> ) {
        this.toggleSwitchAccount(  );
    }
    public toggleSwitchAccount(  ) {
        this.setState( {
            switchAccount: {
                formArea: {
                    active: !this.state.switchAccount.formArea.active,
                },
            },
        } );
    }
    public resetLoginForm(  ) {
        if ( this.email.current && this.password.current ) {
            this.email.current.value = '';
            this.password.current.value = '';
        }
    }
    public clickSubmitSwitchAccount( e: React.MouseEvent<HTMLButtonElement> ) {
        this.submitSwitchAccount(  );
    }
    public submitSwitchAccount(  ) {
        const [ email = '', password = '' ] = [ this.email.current?.value, this.password.current?.value ];
        iam.login( { email, password } ).then( ( { token } ) => cookie.set( { key: 'mouse_console_jwt', value: token } ) ).then( (  ) => {
            const { state, dispatch } = this.context;
            if ( !state.iam.token ) {
                const token = cookie.get( { key: 'mouse_console_jwt' } );
                if ( token ) {
                    dispatch( { type: SETTOKEN, payload: { token, }, } );
                    iam.me( { jwt: token, } ).then( data => dispatch( { type: SETME, payload: { me: data }, } ) );
                }
            }
        } );
    }
    public render(  ) {
        const { active } = this.props;
        const { switchAccount, loading } = this.state;
        const { email, password, } = this;
        return (
            <ul className={ `${ active ? 'block' : 'hidden' } shadow-lg absolute top-full right-0 py-5 min-w-full bg-white min-w-max` } onClick={ stopPropagation<HTMLUListElement>(  ) }>
                <IAMConsumer>
                    { ( { iam } ) => (
                        <li className={ `whitespace-nowrap px-2 py-2 text-md mb-2` }>OrganizationID: <br /><a href="" className={ `underline text-blue-500 hover:text-blue-400` } >{ iam.organization }</a></li>
                    ) }
                </IAMConsumer>

                <li>
                    <Link to='/settings' className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` }>
                        <Mdi icon='tune' className={ `mr-2` } />Settings
                    </Link>
                </li>

                <li className={ `select-none` }>

                    <p className={ `inline-block w-full whitespace-nowrap hover:bg-blue-500 font-bold hover:text-white px-2 py-2 rounded-sm text-sm` } onClick={ stopPropagation<HTMLParagraphElement>( this.clickSwitchAccount.bind( this ) ) }>
                        <Mdi icon='account-switch' className={ `mr-2` } />Switch Account
                    </p>

                    <div className={ `${ switchAccount.formArea.active ? 'py-2' : 'h-0' } overflow-y-hidden transition duration-150 px-2 text-right` }>

                        <label className={ `block text-left cursor-pointer` }>
                            <p className={ `text-sm text-gray-700` }>Email: </p>
                            <input ref={ email } type="text" className={ `rounded outline-none focus:shadow-outline border border-blue-500 focus:border-blue-400 hover:border-blue-400 text-sm py-1 w-full` } />
                        </label>

                        <label className={ `block text-left cursor-pointer` }>
                            <p className={ `text-sm text-gray-700` }>Password: </p>
                            <input ref={ password } type="password" className={ `rounded outline-none focus:shadow-outline border border-blue-500 focus:border-blue-400 hover:border-blue-400 text-sm py-1 w-full` } />
                        </label>

                        {/* サインインユーザー切り替え送信 */}
                        <SwitchAccountBtn
                            onSubmit={ (  ) => ( { email: ( this.email.current?.value || '' ), password: ( this.password.current?.value || '' ) } ) }
                            onSwitch={ (  ) => this.resetLoginForm(  ) }
                        />

                    </div>
                </li>

                <li className={ `select-none` }>

                    {/* サインアウト */}
                    <SignoutBtn />

                </li>
            </ul>
        );
    }
};
