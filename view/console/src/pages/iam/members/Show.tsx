import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MultiContext } from '@/store';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { StaticContext } from 'react-router';
import { IAM } from '@/types';
import { member } from '@/request/member';
import { Btn } from '@/components/atoms/commons/Btn';
type Props = RouteComponentProps<{ id: string; }, StaticContext, unknown> & {};
type States = {
    loaded: boolean
    errors?: string;
    iam?: IAM;
};
let state: States;
let setState: React.Dispatch<React.SetStateAction<States>>;
export const Show: React.FC<Props> = ( { match } ) => {
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
    return (
        <Member { ...{
            links,
            children: ( { token } ) => {
                getIAM( { id, token } );
                return (
                    <>
                        <div className={ `w-full flex my-1` }>
                            <Btn color='blue' to={ `/iam/members/edit/${ id }`}>
                                Edit IAM Member
                            </Btn>
                        </div>
                        <section className='w-full'>
                            <h2 className='font-bold underline'>Show IAM Member</h2>
                            <div className='px-3'>
                                { state.iam?.email }
                            </div>
                        </section>
                    </>
                );
            },
        } } />
    );
};
