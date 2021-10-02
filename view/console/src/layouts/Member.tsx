import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { Appmenu } from '@/components/block/appmenu';
import { LinkParameter } from '@/types';
import { iam } from '@/request/iam';
interface Props {
    head: HeadP;
    links: Array<LinkParameter>;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
        iam.me(  )
    }
    public render(  ) {
        const { head, links, children } = this.props;
        return (
            <Default { ...this.props.head }>
                <HeaderMember />
                <div className={ `relative flex flex-row` }>
                    <Appmenu links={ links } />
                    { children }
                </div>
            </Default>
        );
    }
}
