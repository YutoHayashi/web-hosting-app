export const email = ( value: string | undefined ): true | string => {
    const result: boolean = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test( value ? value : '' );
    return result || 'This is not an email address.';
};
