import axios from 'axios';
export const instance = axios.create( {
    baseURL: `http://${ import.meta.env.VITE_SERVER_NAME }`,
    responseType: 'json',
} );
