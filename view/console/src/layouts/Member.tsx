import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { Appmenu } from '@/components/block/appmenu';
import { LinkParameter } from '@/types';
import { Consumer, MultiContext } from '@/store';
import { iam } from '@/request/iam';
import { SETME } from '@/store/iam';
import { cookie } from '@/middleware/cookie';
interface Props {
    head: HeadP;
    links: Array<LinkParameter>;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public static contextType = MultiContext;
    public constructor( props: Props ) {
        super( props );
    }
    public componentDidMount(  ) {
        const { state, dispatch } = this.context;
        if ( !state.is_authenticated ) {
            const jwt = cookie.get( { key: 'mouse_console_jwt' } );
            iam.me( { jwt, } ).then( me => {
                dispatch( {
                    type: SETME,
                    payload: { me, },
                } );
            } );
        }
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
