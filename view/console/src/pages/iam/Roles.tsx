import { Member } from '@/layouts/Member';
import React from 'react';
import { links } from './links';
interface Props {  }
interface States {  }
export class Roles extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member {
                ...{
                    head: {
                        title: 'IAM Roles',
                    },
                    links,
                }
            } />
        )
    }
}
