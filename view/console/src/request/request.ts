import axios from 'axios';
export const instance = axios.create( {
    baseURL: `http://${ import.meta.env.VITE_SERVER_NAME }`,
    responseType: 'json',
} );
instance.interceptors.response.use( res => Promise.resolve( res ), function( error ) {
    const { status } = error.response;
    return Promise.reject( status );
} );
