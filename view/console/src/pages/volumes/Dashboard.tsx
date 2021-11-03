import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
type Props = {};
type States = {};
export const Dashboard: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'Volumes Dashboard',
            },
            links,
            children: ( { token } ) => (
                <></>
            ),
        } } />
    );
};
