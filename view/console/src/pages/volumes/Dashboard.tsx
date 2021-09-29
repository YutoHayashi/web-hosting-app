import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
interface Props {  }
interface States {  }
export class Dashboard extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member {
                ...{
                    head: {
                        title: 'Volumes Dashboard',
                    },
                    links,
                    children: (
                        <></>
                    ),
                }
            } />
        );
    }
}
