import React from 'react';
import i18next from 'i18next';
import { i18nProps } from '@/types';
import { Guest } from '@/components/layouts/Guest';
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
interface Props extends i18nProps {  }
export default class Policy extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <Guest
                { ...{
                    head: {
                        title: 'Sign in',
                    },
                    children: (
                        <>
                            {/* Signed in as { session.user.email } */}
                        </>
                    ),
                } }
            />
        );
    }
}
