import React, { ReactNode } from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/block/HeaderMember';
import { AppMenu } from '@/components/block/AppMenu';
import { Alert } from '@/components/block/Alert';
import { LinkParameter } from '@/types';
import { MultiContext } from '@/store';
import { Breadcrumbs } from '@/components/block/Breadcrumbs';
import { WithAuthentication } from '@/middleware/Auth';
interface Props {
    head?: HeadP;
    links?: Array<LinkParameter>;
    children: ( args: { token: string } ) => ReactNode;
}
interface States {  }
export class Member extends React.Component<Props, States> {
    public static contextType = MultiContext;
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { head, links = [  ], children } = this.props;
        return (
            <Default { ...this.props.head }>
                <HeaderMember />
                <div className={ `relative flex flex-row` }>
                    <AppMenu links={ links } />
                    <div className={ `bg-white w-full` }>
                        <Breadcrumbs />
                        <Alert />
                        <div className={ `p-2` }>
                            <WithAuthentication>
                                { ( { token } ) => children( { token } ) }
                            </WithAuthentication>
                        </div>
                    </div>
                </div>
            </Default>
        );
    }
}
