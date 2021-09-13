import React, { useEffect } from 'react';
import '@/styles/scss/style.scss';
import type { AppProps } from 'next/app';
import i18next from 'i18next';
import { site } from '@/contexts/site';
import { init } from '@/services/i18n';
init(  );
function MyApp( { Component, pageProps }: AppProps ): JSX.Element {
    useEffect( (  ) => {
        i18next.changeLanguage( pageProps.lang );
    } );
    return (
        <site.Provider value={ { name: 'MOUSE' } }>
            <Component { ...pageProps } suppressHydrationWarning />
        </site.Provider>
    );
}
export default MyApp;
