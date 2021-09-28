import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { Appmenu } from '@/components/block/appmenu';
interface Props {
    head: HeadP;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Default { ...this.props.head }>
                <HeaderMember />
                <div className={ `relative flex flex-row` }>
                    <Appmenu />
                </div>
            </Default>
        );
    }
}
