import React from 'react';
import { Mdi } from '@/components/utils/Mdi';
import { Link } from 'react-router-dom';
interface Props {  }
interface States {  }
export class Appmenu extends React.Component<Props, States> {
    public constructor( props: Props ) {
        super( props );
    }
    public render(  ) {
        return (
            <div className={ `absolute top-0 left-0 lx:relative w-auto py-5 bg-gray-100 shadow` }>
                <div className={ `flex px-3 py-3` }>
                    <h2 className={ `font-bold tracking-wider text-sm` }>MOUSE</h2>
                </div>
                <hr />
                <nav className={ `py-3` }>
                    <ul>
                        { [
                            { to: '/auth', name: 'IAM', children: [  ] },
                            { to: '/settings', name: 'Settings', children: [  ] },
                        ].map( _ => (
                            <li className={ `text-sm font-bold` } key={ _.to }>
                                <Link to={ _.to } className={ `block py-1 px-3 text-gray-600 bg:transparent hover:bg-gray-200 rounded` }><Mdi icon='menu-right' />{ _.name }</Link>
                            </li>
                        ) ) }
                    </ul>
                </nav>
            </div>
        );
    }
}
