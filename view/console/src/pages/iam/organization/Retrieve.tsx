import { Member } from '@/layouts/Member';
import React from 'react';
import { links } from './links';
type Props = {}
type States = {}
export const Retrieve: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            links,
            children: ( { token } ) => <></>
        } } />
    );
};
