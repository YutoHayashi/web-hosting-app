import React from 'react';
import logo from '@/images/logo.svg';
import { Member } from '@/layouts/Member';
import { links } from './links';
export class Top extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <Member {
                ...{
                    head: {
                        title: 'MOUSE',
                    },
                    links,
                }
            } />
        );
    }
}
