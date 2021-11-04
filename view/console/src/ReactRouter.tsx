import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Routes } from '@/types';
import { routes } from '@/routes';
const parse: ( routes: Routes ) => Routes = routes => {
    const result: Routes = [  ];
    routes.forEach( route => {
        result.push( route, ...parse( route.children?.map( child => {
            return { ...child, ...{ path: `${ route.path }${ child.path }` } };
        } ) || [  ] ) );
    } );
    return result;
};
export const ReactRouter: React.FC<{}> = ( { children } ) => {
    return (
        <BrowserRouter key='browser-router'>
            { children }
        </BrowserRouter>
    )
}
export const ReactRouterView: React.FC<{}> = ( {  } ) => {
    return (
        <Switch>
            { parse( routes ).map( route => <Route key={ route.path } exact={ route.exact || false } path={ route.path } component={ route.component } /> ) }
        </Switch>
    );
};
