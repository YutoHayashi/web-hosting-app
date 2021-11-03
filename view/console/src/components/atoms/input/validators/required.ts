export const required = ( value: any ): true | string => !!value || 'This is a required field.';
