import React from 'react';
import { Link } from 'react-router-dom';
import { Guest } from '@/layouts/Guest';
import { Required } from '@/components/parts/Required';
import { Btn } from '@/components/parts/Btn';
interface States {
    loading: boolean;
    error: Array<string>;
}
export class Signup extends React.Component<{  }, States> {
    public constructor( props: {  } ) {
        super( props );
        this.state = {
            loading: false,
            error: [  ],
        };
    }
    public clickSubmit: React.MouseEventHandler<HTMLButtonElement> = (  ) => {
        this.setState( {
            loading: true,
        } );
    }
    public render(  ) {
        const { loading, error } = this.state;
        return (
            <Guest>
                <div className={ `grid lg:grid-cols-2` }>
                    <div></div>
                    <div className={ `shadow py-10 px-5 md:px-10` }>
                        <h2 className={ `text-2xl font-bold tracking-wider mb-5 text-gray-600` }>Sign up your organization account</h2>
                        { ( error.length > 0 ) ? (
                        <ul className={ `mb-5` }>
                            { error.map( e => (
                                <li className={ `block text-red-500 text-sm` }>{ e }</li>
                            ) ) }
                        </ul>
                        ) : null }
                        <label html-for='name-input' className={ `mb-5 block` }>
                            <span className={ `font-bold text-gray-400 mr-1` }>Organization: </span>
                            <Required />
                            <br />
                            <p className={ `block text-gray-500 text-sm` }></p>
                            <input id='name-input' type='text' name='name' className={ `form-input rounded w-full text-gray-400` } placeholder='Enter the Organization name' autoComplete='on' required></input>
                        </label>
                        <label html-for='email-input' className={ `mb-5 block` }>
                            <span className={ `font-bold text-gray-400 mr-1` }>Email: </span>
                            <Required />
                            <br />
                            <p className={ `block text-gray-500 text-sm` }></p>
                            <input id='email-input' type='email' name='email' className={ 'form-input rounded w-full text-gray-400' } placeholder='Enter the Email address' required></input>
                        </label>
                        <label html-for='password-input' className={ `mb-5 block` }>
                            <span className={ `font-bold text-gray-400 mr-1` }>Password: </span>
                            <Required />
                            <br />
                            <p className={ `block text-gray-500 text-sm` }>Between 8 and 32 characters.</p>
                            <input id='password-input' type='password' name='password' className={ `form-input rounded w-full text-gray-400` } minLength={ 8 } maxLength={ 32 } autoComplete='new-password' placeholder='Enter the password' required></input>
                        </label>
                        <label html-for='repassword-input' className={ `mb-5 block` }>
                            <span className={ `font-bold text-gray-400 mr-1` }>Re-password: </span>
                            <Required />
                            <br />
                            <p className={ `block text-gray-500 text-sm` }></p>
                            <input id='repassword-input' type='password' name='password' className={ `form-input rounded w-full text-gray-400` } minLength={ 8 } maxLength={ 32 } placeholder='Re-enter the password' required></input>
                        </label>
                        <div className={ `grid lg:grid-cols-2` }>
                            <div></div>
                            <Btn color='blue' submit={ true } loading={ loading } onClick={ this.clickSubmit }>Sign up</Btn>
                        </div>
                    </div>
                </div>
            </Guest>
        );
    }
}
