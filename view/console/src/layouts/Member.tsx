import React, { ReactNode } from 'react';
import { Default, Props as HeadP } from './Default';
import { HeaderMember } from '@/components/organisms/blocks/HeaderMember';
import { AppMenu } from '@/components/organisms/blocks/AppMenu';
import { Alert } from '@/components/organisms/blocks/Alert';
import { LinkParameter } from '@/types';
import { Breadcrumbs } from '@/components/organisms/blocks/Breadcrumbs';
import { WithAuthentication } from '@/middleware/Auth';
type Props = {
    head?: HeadP;
    links?: Array<LinkParameter>;
    children: ( args: { token: string } ) => ReactNode;
}
export const Member: React.FC<Props> = ( { head, links = [  ], children } ) => {
    return (
        <Default { ...head }>
            <HeaderMember />
            <div className={ `relative flex flex-row` }>
                <AppMenu links={ links } />
                <div className={ `bg-white w-full` }>
                    <Breadcrumbs />
                    <div className={ `py-1 px-2` }>
                        <Alert />
                        <WithAuthentication>
                            { ( { token } ) => children( { token } ) }
                        </WithAuthentication>
                    </div>
                </div>
            </div>
        </Default>
    );
};
