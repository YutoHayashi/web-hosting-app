import React from 'react';
import Link from 'next/link';
import { LinkParameter } from '@/types';
interface Props {
    links: Array<LinkParameter>;
}
export class BreadCrumbs extends React.Component<Props, {  }> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { links } = this.props;
        return (
            <ul className={ `flex text-gray-500 text-sm lg:text-base` }>
                { links.map( link => (
                    <li className={ `inline-flex items-center` } key={ link.href }>
                        <Link href={ link.href }>{ link.name }</Link>
                        <svg className="h-5 w-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </li>
                ) ) }
            </ul>
        );
    }
}
