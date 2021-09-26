import React from 'react';
import Link from 'next/link';
import __ from 'i18next';
import { i18nProps } from '@/types';
import { Guest } from '@/components/layouts/Guest';
import { Btn } from '@/components/parts/Btn';
import { Mdi } from '@/components/utils/Mdi';
import { Alert } from '@/components/block/Alert';
export { getStaticPaths, getStaticProps } from '@/middleware/i18n';
interface Props extends i18nProps {  }
interface States {
    loading: boolean;
    error: Array<string>;
}
export default class Policy extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
        this.state = {
            loading: false,
            error: [  ],
        };
    }
    public submitClicked: React.MouseEventHandler<HTMLButtonElement> = (  ) => {
        this.setState( {
            loading: true,
        } );
    }
    public render(  ) {
        return (
            <Guest
                { ...{
                    head: {
                        title: __.t( 'signin' ),
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
