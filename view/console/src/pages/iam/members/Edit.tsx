import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { member } from '@/request/member';
import { MultiContext } from '@/store';
import { StaticContext } from 'react-router';
import { IAMMember } from '@/components/organisms/forms/IAMMember';
import { IAM } from '@/types';
type Props =  RouteComponentProps<{ id: string; }, StaticContext, unknown> & {};
type States = {
    loaded: boolean;
    errors?: string;
    iam?: IAM;
};
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
export const Edit: React.FC<Props> = ( { match } ) => {
    const { id } = match.params;
    const context = React.useContext( MultiContext );
    const getIAM = ( params: { id: string, token: string, } ) => {
        if ( !state.loaded ) {
            const { id = context?.state?.iam.me.id?.toString(  ) || '', token } = params;
            member.show( { id, jwt: token } )
                .then( ( iam ) => setState( { ...state, ...{ iam, loaded: true, } } ) )
                .catch( errors => setState( { ...state, ...{ errors, loaded: true, } } ) );
        }
    };
    [ state, setState ] = React.useState<States>( { loaded: false, } );
    const iam = state.iam;
    return (
        <Member { ...{
            links,
            children: ( { token } ) => {
                getIAM( { id, token } );
                return (
                    <>
                        <section className='w-full'>
                            <h2 className='font-bold underline'>Add IAM Member</h2>
                            <div className='px-3'>
                                <IAMMember onSubmit={ ( e, params ) => {
                                    const { name, email } = params;
                                    const organization = context?.state?.iam.me.organization || '';
                                    return member.edit( { organization, name, email, jwt: token } );
                                } } defaultParams={ { name: iam?.name || '', email: iam?.email || '', } } />
                            </div>
                        </section>
                    </>
                );
            },
        } } />
    );
};
