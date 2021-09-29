import axios from 'axios';
export const instance = axios.create( {
    baseURL: `api.${ import.meta.env.VITE_SERVER_NAME }`,
    responseType: 'json',
} );
