import React from 'react';
import { site } from '@/contexts/site';
import { Seo } from '@/components/utils/Seo';
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
                        <Seo
                            title={ title }
                            description=''
                        />
                        { children }
                    </>
                ) }
            </site.Consumer>
        );
    }
}
