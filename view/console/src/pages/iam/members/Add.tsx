import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { Text } from '@/components/inputs/Text';
import { Email } from '@/components/inputs/Email';
import { Password } from '@/components/inputs/Password';
import { Btn } from '@/components/parts/Btn';
import { member } from '@/request/member';
import { MultiContext } from '@/store';
interface Props {  }
interface States {
    loading: boolean;
}
export class Add extends React.Component<Props, States> {
    private name = React.createRef<Text>(  );
    private email = React.createRef<Email>(  );
    private password = React.createRef<Password>(  );
    public static contextType = MultiContext;
    public constructor( props: Props ) {
        super( props );
        this.state = {
            loading: false,
        }
    }
    private submit( args: { token: string; } ) {
        const { name, email, password } = this;
        if ( [ name.current?.isValid(  ), email.current?.isValid(  ), password.current?.isValid(  ) ].reduce( ( p, c ) => p && c ) ) {
            const { state } = this.context;
            this.setState( { ...this.state, ...{ loading: true, }, } );
            member.add( {
                jwt: args.token,
                organization: state.iam.me.organization,
                name: this.name.current?.value || '',
                email: this.email.current?.value || '',
                password: this.password.current?.value || '',
            } )
                .then( iam => this.setState( { ...this.state, ...{ loading: false, }, } ) )
                .then( (  ) => {
                    name.current?.reset(  );
                    email.current?.reset(  );
                    password.current?.reset(  );
                } );
        }
    }
    public render(  ) {
        const { loading } = this.state;
        return (
            <Member
                { ...{
                    links,
                    children: ( { token } ) => {
                        return (
                            <section className={ `w-full` }>
                                <h2 className={ `font-bold underline` }>Add Member</h2>
                                <div className={ `px-3` }>
                                    <Text ref={ this.name } title={ `Name` } name={ `name` } required={ true } autofocus={ true } className={ `my-3` } />
                                    <Email ref={ this.email } title={ `Email` } name={ 'email' } required={ true } autoComplete={ 'off' } className={ `my-3` } />
                                    <Password ref={ this.password } title={ `Password` } name={ 'password' } required={ true } autoComplete={ 'new-password' } className={ `my-3` } />
                                </div>
                                <div className={ `flex` }>
                                    <Btn color='blue' className={ `ml-auto` } onClick={ e => this.submit( { token, } ) } { ...{ loading, } }>validation</Btn>
                                </div>
                            </section>
                        );
                    },
                } }
            />
        );
    }
}
