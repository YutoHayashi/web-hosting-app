import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
type Props = {};
type States = {};
export const Top: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            head: {
                title: 'MOUSE',
            },
            links,
            children: ( { token } ) => (
                <></>
            ),
        } } />
    );
};
