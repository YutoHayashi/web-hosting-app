import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { Appmenu } from '@/components/block/appmenu';
import { LinkParameter } from '@/types';
import { StoreDispatchContext } from '@/store';
import { iam } from '@/request/iam';
import { SETME } from '@/store/iam';
interface Props {
    head: HeadP;
    links: Array<LinkParameter>;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public static contextType = StoreDispatchContext;
    public constructor( props: Props ) {
        super( props );
    }
    public componentDidMount(  ) {
        const dispatch = this.context;
        iam.me( 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIiwiZXhwIjoxNjMzNDc0Nzk1LCJlbWFpbCI6InlfaGF5YXNoaUBhbHRhLmNvLmpwIn0.sV-xBUjYeDPvRpgkOV0XoJ2Oa9cDyzUa_K14qjYlHRo' ).then( me => {
            dispatch( {
                type: SETME,
                payload: { me, },
            } );
        } );
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
