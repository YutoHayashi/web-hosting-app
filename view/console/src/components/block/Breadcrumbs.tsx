import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
interface Props {  }
type States = { name: string }[];
export const Breadcrumbs: React.FC<Props> = ( { children } ) => {
    const history = useHistory(  );
    const [ state, setState ] = useState<States>( [  ] );
    useEffect( (  ) => {
        setState( history.location.pathname.split( '/' ).map( name => ( { name, } ) ) );
        return history.listen( location => setState( location.pathname.split( '/' ).map( name => ( { name, } ) ) ) );
    }, [ history ] );
    const className = `font-bold text-xs text-white px-2`;
    return (
        <ul className={ `bg-gray-600 w-full py-1 px-2 flex` }>
            { history.location.pathname === '/' ? <li><Link to={ `/` } className={ `${ className }` }>/</Link></li> : state.map(
                ( _, i ) => <li key={ _.name }>
                    <Link
                        to={ `${ state.map( _ => _.name ).splice( 1, i ).reduce( ( p, c ) => p + `/${ c }`, '' ) }` }
                        className={ `${ className } ${ i === ( state.length - 1 ) ? '' : 'text-blue-400 hover:text-blue-300' }` }
                    >
                            /{ _.name }
                    </Link>
                </li>
            ) }
        </ul>
    );
}
