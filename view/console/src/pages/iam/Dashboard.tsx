import { Member } from '@/layouts/Member';
import React from 'react';
import { links } from './links';
type Props = {};
type States = {};
export const Dashboard: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'IAM Dashboard,'
            },
            links,
            children: ( { token } ) => (
                <></>
            ),
        } } />
    );
};
