export const cookie = {
    get: ( { key }: { key: string; } ) => {
        let value: string = '';
        try {
            value = decodeURIComponent( document.cookie.split( ';' ).find( c => c.split( '=' )[ 0 ].replace( / /, '' ) === `${ key }` )?.split( '=' )[ 1 ] || '' );
        } finally {
            return value;
        }
    },
    set: ( { key, value, age = undefined }: { key: string; value: any; age?: number; } ) => {
        cookie.delete( { key } );
        document.cookie = `${ key }=${ encodeURIComponent( value ) }${ age ? `;max-age=${ age }` : '' }`;
    },
    delete: ( { key }: { key: string } ) => {
        document.cookie = `${ key }=;max-age=0`;
    },
};
