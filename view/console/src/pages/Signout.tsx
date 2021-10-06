import React from 'react';
import { Member } from '@/layouts/Member';
import { links } from './links';
export class Signout extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member {
                ...{
                    head: {
                        title: 'Signout',
                    },
                    links,
                }
            } />
        );
    }
}
