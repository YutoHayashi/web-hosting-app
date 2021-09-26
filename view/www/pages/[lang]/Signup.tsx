import React from 'react';
import Link from 'next/link'
import __ from 'i18next';
import { i18nProps } from '@/types';
import { Guest } from '@/components/layouts/Guest';
import { Required } from '@/components/parts/Required';
import { Btn } from '@/components/parts/Btn';
import { Mdi } from '@/components/utils/Mdi'
import { Alert } from '@/components/block/Alert';
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
interface Props extends i18nProps {  }
interface States {
    loading: boolean;
    error: Array<string>;
}
export default class Signup extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            loading: false,
            error: [  ],
        };
    }
    public submitClicked: React.MouseEventHandler<HTMLButtonElement> = (  ) => {
        this.setState( {
            loading: true,
        } );
    }
    public render(  ) {
        const { loading, error } = this.state;
        return (
            <Guest { ...{
                head: {
                    title: __.t( 'heading_signup_org' ),
                },
                children: (
                    <div className={ `shadow grid lg:grid-cols-2 rounded-2xl overflow-hidden` }>
                        <div className={ `flex flex-col justify-between py-10 px-5 md:px-10` } style={ { background: 'linear-gradient( to top, #12c2e9, #c471ed, #f64f59 )' } }>
                            <h2 className={ `text-2xl font-bold tracking-wider mb-10 text-white` }>{ __.t( 'heading_signup_org' ) }</h2>
                            <p className={ `mt-auto text-right text-white` }>If you already have an organization account, you can sign in using the button below.</p>
                            <div className={ `grid lg:grid-cols-2` }>
                                <div></div>
                                <div className={ `w-full mb-5` }>
                                    <Btn href={ `/${ this.props.lang }/Signin` } color='white' className={ `bg-white text-gray-600 w-full` } >{ __.t( 'signin' ) }<Mdi icon='chevron-right' className={ `ml-2` } /></Btn>
                                </div>
                            </div>
                        </div>
                        <div className={ `py-10 px-5 md:px-10` }>
                            { ( error.length > 0 ) ? (
                            <ul className={ `mb-5` }>
                                { error.map( e => (
                                    <li key={ e } className={ `block text-red-500 text-sm` }>{ e }</li>
                                ) ) }
                            </ul>
                            ) : null }
                            <label html-for='name-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-blue-400 hover:text-blue-500 mr-1 border-b-2 border-transparent hover:border-blue-500 cursor-pointer` }>{ __.t( 'organization' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }>Maximum 50 characters.</p>
                                <input id='name-input' maxLength={ 50 } type='text' name='name' className={ `form-input rounded w-full text-gray-400 cursor-pointer` } placeholder={ __.t( 'organization_placeholder' ) } autoComplete='on' required></input>
                            </label>
                            <label html-for='email-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-blue-400 hover:text-blue-500 mr-1 border-b-2 border-transparent hover:border-blue-500 cursor-pointer` }>{ __.t( 'email' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }>You can register an email address of up to 255 characters.<br />You cannot use an email address that has already been registered.</p>
                                <input id='email-input' maxLength={ 255 } type='email' name='email' className={ 'form-input rounded w-full text-gray-400 cursor-pointer' } placeholder={ __.t( 'email_placholder' ) } required></input>
                            </label>
                            <hr className={ `my-8` } />
                            <label html-for='password-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-blue-400 hover:text-blue-500 mr-1 border-b-2 border-transparent hover:border-blue-500 cursor-pointer` }>{ __.t( 'password' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }>Between 8 and 32 characters.</p>
                                <input id='password-input' type='password' name='password' className={ `form-input rounded w-full text-gray-400 cursor-pointer` } minLength={ 8 } maxLength={ 32 } autoComplete='new-password' placeholder={ __.t( 'password_placeholder' ) } required></input>
                            </label>
                            <label html-for='repassword-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-blue-400 hover:text-blue-500 mr-1 border-b-2 border-transparent hover:border-blue-500 cursor-pointer` }>{ __.t( 're-password' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }></p>
                                <input id='repassword-input' type='password' name='repassword' className={ `form-input rounded w-full text-gray-400 cursor-pointer` } minLength={ 8 } maxLength={ 32 } placeholder={ __.t( 're-password_placeholder' ) } required></input>
                            </label>
                            <div className={ `grid lg:grid-cols-2` }>
                                <div></div>
                                <Btn color='blue' submit={ true } loading={ loading } onClick={ this.submitClicked }>{ __.t( 'signup' ) }<Mdi icon='chevron-right' className={ `ml-2` } /></Btn>
                            </div>
                        </div>
                    </div>
                ),
            } } />
        );
    }
}
