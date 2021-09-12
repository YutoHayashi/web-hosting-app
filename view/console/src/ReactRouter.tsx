import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes, Routes } from '@/routes';
export class ReactRouter extends React.PureComponent {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <BrowserRouter key="browser-router">
                { this.props.children }
            </BrowserRouter>
        );
    }
}
export class ReactRouterView extends React.Component<{  }, {  }> {
    public constructor( props: {  } ) {
        super( props );
    }
    public render(  ) {
        return (
            <Switch>
                { this.parse( routes ).map( route => <Route key={ route.path } exact={ route.exact || false } path={ route.path } component={ route.component } /> ) }
            </Switch>
        );
    }
    public parse( routes: Routes ): Routes {
        const result: Routes = [  ];
        routes.forEach(
            route => {
                result.push( route, ...this.parse( route.children?.map( child => {
                    return { ...child, ...{ path: `${ route.path }${ child.path }` } };
                } ) || [  ] ) );
            },
        );
        return result;
    }
}
