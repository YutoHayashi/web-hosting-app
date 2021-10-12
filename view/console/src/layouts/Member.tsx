import React from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { AppMenu } from '@/components/block/AppMenu';
import { Alert } from '@/components/block/Alert';
import { LinkParameter } from '@/types';
import { MultiContext } from '@/store';
import { iam } from '@/request/iam';
import { SETME, SETTOKEN } from '@/store/iam';
import { cookie } from '@/services/cookie';
import { Breadcrumbs } from '@/components/block/Breadcrumbs';
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
        if ( !state.iam.token ) {
            const token = cookie.get( { key: 'mouse_console_jwt' } );
            if ( token ) {
                dispatch( { type: SETTOKEN, payload: { token, }, } );
                iam.me( { jwt: token, } ).then( data => dispatch( { type: SETME, payload: { me: data }, } ) );
            }
        }
    }
    public render(  ) {
        const { head, links, children } = this.props;
        return (
            <Default { ...this.props.head }>
                <HeaderMember />
                <div className={ `relative flex flex-row` }>
                    <AppMenu links={ links } />
                    <div className={ `bg-white w-full` }>
                        <Breadcrumbs />
                        <Alert />
                        <div className={ `p-2` }>
                            { children }
                        </div>
                    </div>
                </div>
            </Default>
        );
    }
}
