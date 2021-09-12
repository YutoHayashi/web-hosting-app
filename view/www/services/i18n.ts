import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
export const languages = [ 'en', 'ja' ];
export const defaultLanguage = 'en';
export const init = (  ) => {
    const locales = Object.assign(
        {  },
        ...languages.map( lang => {
            return {
                [ lang ]: {
                    translations: require( '@/locales/' + lang + '/common.json' ),
                },
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
    i18next.use( LanguageDetector ).init( {
        detection: detection,
        fallbackLng: defaultLanguage,
        resources: locales,
        returnObjects: true,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
    } );
}
