import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
type Props = {};
type States = {};
export const Dashboard: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'Settings Dashboard',
            },
            links,
            children: ( { token } ) => (
                <></>
            ),
        } } />
    );
};
