import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
type Props = {};
type States = {};
export const Signout: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'Signout',
            },
            links,
            children: ( { token } ) => (
                <></>
            ),
        } } />
    );
};
