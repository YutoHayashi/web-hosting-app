import React from 'react';
import i18next from 'i18next';
import { i18nProps } from '@/types';
import { Guest } from '@/components/layouts/Guest';
import { Required } from '@/components/parts/Required';
import { Btn } from '@/components/parts/Btn';
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
                    title: i18next.t( 'heading_signup_org' ),
                },
                children: (
                    <div className={ `grid lg:grid-cols-2` }>
                        <div></div>
                        <div className={ `shadow py-10 px-5 md:px-10` }>
                            <h2 className={ `text-2xl font-bold tracking-wider mb-5 text-gray-600` }>{ i18next.t( 'heading_signup_org' ) }</h2>
                            { ( error.length > 0 ) ? (
                            <ul className={ `mb-5` }>
                                { error.map( e => (
                                    <li key={ e } className={ `block text-red-500 text-sm` }>{ e }</li>
                                ) ) }
                            </ul>
                            ) : null }
                            <label html-for='name-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-gray-400 mr-1` }>{ i18next.t( 'organization' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }></p>
                                <input id='name-input' type='text' name='name' className={ `form-input rounded w-full text-gray-400` } placeholder={ i18next.t( 'organization_placeholder' ) } autoComplete='on' required></input>
                            </label>
                            <label html-for='email-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-gray-400 mr-1` }>{ i18next.t( 'email' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }></p>
                                <input id='email-input' type='email' name='email' className={ 'form-input rounded w-full text-gray-400' } placeholder={ i18next.t( 'email_placholder' ) } required></input>
                            </label>
                            <label html-for='password-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-gray-400 mr-1` }>{ i18next.t( 'password' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }>Between 8 and 32 characters.</p>
                                <input id='password-input' type='password' name='password1' className={ `form-input rounded w-full text-gray-400` } minLength={ 8 } maxLength={ 32 } autoComplete='new-password' placeholder={ i18next.t( 'password_placeholder' ) } required></input>
                            </label>
                            <label html-for='repassword-input' className={ `mb-5 block` }>
                                <span className={ `font-bold text-gray-400 mr-1` }>{ i18next.t( 're-password' ) }: </span>
                                <Required />
                                <br />
                                <p className={ `block text-gray-500 text-sm` }></p>
                                <input id='repassword-input' type='password' name='password2' className={ `form-input rounded w-full text-gray-400` } minLength={ 8 } maxLength={ 32 } placeholder={ i18next.t( 're-password_placeholder' ) } required></input>
                            </label>
                            <div className={ `grid lg:grid-cols-2` }>
                                <div></div>
                                <Btn color='blue' submit={ true } loading={ loading } onClick={ this.submitClicked }>{ i18next.t( 'signup' ) }</Btn>
                            </div>
                        </div>
                    </div>
                ),
            } } />
        );
    }
}
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
