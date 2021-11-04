import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { member } from '@/request/member';
import { MultiContext } from '@/store';
import { StaticContext } from 'react-router';
import { IAMMember } from '@/components/organisms/forms/IAMMember';
type Props =  RouteComponentProps<{ id: string; }, StaticContext, unknown> & {};
type States = {}
export const Add: React.FC<Props> = ( {  } ) => {
    const context = React.useContext( MultiContext );
    return (
        <Member { ...{
            links,
            children: ( { token } ) => {
                return (
                    <>
                        <section className='w-full'>
                            <h2 className='font-bold underline'>Add IAM Member</h2>
                            <div className='px-3'>
                                <IAMMember onSubmit={ ( e, params ) => {
                                    const { name, email, password } = params;
                                    const organization = context?.state?.iam.me.organization || '';
                                    return member.add( { organization, name, email, password, jwt: token } )
                                        .catch( e => Promise.reject( e ) );
                                } } />
                            </div>
                        </section>
                    </>
                );
            },
        } } />
    );
}
