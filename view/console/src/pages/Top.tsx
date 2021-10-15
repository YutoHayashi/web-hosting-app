import React, { ReactNode } from 'react';
import logo from '@/images/logo.svg';
import { Member } from '@/layouts/Member';
import { links } from './links';
interface Props {  }
export class Top extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member
                head={ {
                    title: 'MOUSE',
                } }
                links={ links }
            >
                { ( { token } ) => {
                    return (
                        <></>
                    );
                } }
            </Member>
        );
    }
}
