export const required = ( value: string | undefined ): true | string => {
    return !!value || 'This is a required field.';
};
