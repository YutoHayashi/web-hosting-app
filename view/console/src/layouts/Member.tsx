import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { Appmenu } from '@/components/block/appmenu';
import { LinkParameter } from '@/types';
import { Consumer } from '@/store';
interface Props {
    head: HeadP;
    links: Array<LinkParameter>;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public static contextType = Consumer;
    public constructor( props: Props ) {
        super( props );
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
