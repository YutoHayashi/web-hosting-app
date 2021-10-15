import React from 'react';
import { Mdi } from '@/components/utils/Mdi';
import { Link } from 'react-router-dom';
import { LinkParameter } from '@/types';
interface Props {
    links: Array<LinkParameter>;
}
interface States {  }
export class AppMenu extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        const { links } = this.props;
        return (
            <div className={ `absolute md:relative top-0 left-0 lx:relative w-auto py-5 bg-white shadow` }>
                <div className={ `flex px-3 py-3` }>
                    <h2 className={ `font-bold tracking-wider text-sm text-gray-600` }>MOUSE Services</h2>
                </div>
                <hr className={ `border-gray-600` } />
                <div className={ `relative` }>
                    <nav className={ `top-0 py-3 min-w-full` }>
                        <ul>
                            { links.map( ( _, i ) => (
                                <li className={ `text-sm font-bold` } key={ i }>
                                    <Link to={ _.href } className={ `whitespace-nowrap block py-1 pl-3 pr-5 text-gray-600 bg:transparent hover:bg-gray-200` }><Mdi icon='menu-right' />{ _.name }</Link>
                                </li>
                            ) ) }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
