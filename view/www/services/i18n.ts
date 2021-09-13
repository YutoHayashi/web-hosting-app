import i18next from 'i18next';
import { initReactI18next  } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
export const languages = [ 'en', 'ja' ];
export const defaultLanguage = 'en';
const ns = [ 'translations', ];
export const init = (  ) => {
    const locales = Object.assign(
        {  },
        ...languages.map( lang => {
            return {
                [ lang ]: ns.map( _ns => ( {
                    [ _ns ]: require( '@/locales/' + lang + '/' + _ns + '.json' ),
                } ) ).reduce( ( p, c ) => Object.assign( p, c ) ),
            };
        } ),
    );
    const detection = {
        order: [
            'querystring',
            'cookie',
            'localStorage',
            'sessionStorage',
            'navigator',
            'htmlTag',
            'path',
            'subdomain',
        ],
        lookupCookie: 'lng',
        lookupLocalStorage: 'lng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
        caches: [ 'localStorage', 'cookie' ],
        excludeCacheFor: [ 'cimode' ],
        cookieOptions: { path: '/' },
    };
    i18next.use( initReactI18next ).use( LanguageDetector ).init( {
        defaultNS: ns[ 0 ],
        ns,
        detection: detection,
        fallbackLng: defaultLanguage,
        resources: locales,
        returnObjects: true,
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
        initImmediate: true,
    } );
}
