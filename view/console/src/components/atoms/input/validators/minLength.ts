export const minLength = ( value: string, minLength: number ): true | string => ( value.length >= minLength ) || `It is over ${ minLength } charactor short.`;
