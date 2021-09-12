import React from 'react';
import Head from 'next/head';
import { site } from '@/contexts/site';
export interface DefaultProps {
    title: string;
}
export class Default extends React.Component<DefaultProps, {  }> {
    public constructor( props: DefaultProps ) {
        super( props );
    }
    public render(  ) {
        const { title, children } = this.props;
        return (
            <site.Consumer>
                { ( { name } ) => (
                    <>
                        <Head>
                            <title>{ title } | { name }</title>
                        </Head>
                        { children }
                    </>
                ) }
            </site.Consumer>
        );
    }
}
