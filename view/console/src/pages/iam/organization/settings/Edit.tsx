import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { StaticContext } from 'react-router';
type Props = RouteComponentProps<{ id: string; }, StaticContext, unknown> & {};
type States = {};
export const Edit: React.FC<Props> = ( {  } ) => {
    return (
        <Member { ...{
            links,
            children: ( { token } ) => <></>
        } } />
    );
};
