import React from 'react';
export interface SiteContext {
    name: string;
}
export const site = React.createContext<SiteContext>( {
    name: 'sitename',
} );
