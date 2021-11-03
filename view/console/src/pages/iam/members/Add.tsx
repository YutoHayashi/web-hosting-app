import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { member } from '@/request/member';
import { MultiContext } from '@/store';
import { IAMMember } from '@/components/organisms/forms/IAMMember';
type Props = {}
type States = {}
export const Add: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            links,
            children: ( { token } ) => {
                return (
                    <section className={ `w-full` }>
                        <h2 className={ `font-bold underline` }>Add Member</h2>
                        <div className={ `px-3` }>
                            <IAMMember onSubmit={ e => {
                                return new Promise( resolve => {
                                    setTimeout( (  ) => {
                                        resolve(  );
                                    }, 5000);
                                } );
                            } } />
                        </div>
                    </section>
                );
            },
        } } />
    );
}
