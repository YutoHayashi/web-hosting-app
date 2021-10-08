export const cookie = {
    get: ( { key }: { key: string; } ) => {
        return decodeURIComponent( document.cookie.split( ';' ).find( c => c.split( '=' )[ 0 ] === ` ${ key }` )?.split( '=' )[ 1 ] || '' );
    },
    set: ( { key, value, age = undefined }: { key: string; value: any; age?: number; } ) => {
        document.cookie = `${ key }=${ encodeURIComponent( value ) }${ age ? `;max-age=${ age }` : '' }`;
    },
    delete: ( { key }: { key: string } ) => {
        document.cookie = `${ key }=;max-age=0`;
    },
};
