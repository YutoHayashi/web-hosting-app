import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Member } from '@/layouts/Member';
import { links } from './links';
import { StaticContext } from 'react-router';
interface Props extends RouteComponentProps<{ id: string; }, StaticContext, unknown> {  }
interface States {  }
export const Edit = withRouter( class extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member
                { ...{
                    links,
                    children: ( { token } ) => <></>
                } }
            />
        );
    }
} );
