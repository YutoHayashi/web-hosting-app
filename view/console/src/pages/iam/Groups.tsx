import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
type Props = {};
type States = {};
export const Groups: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'IAM Group',
            },
            links,
            children: ( { token } ) => {
                return (
                    <></>
                );
            },
        } } />
    );
};
