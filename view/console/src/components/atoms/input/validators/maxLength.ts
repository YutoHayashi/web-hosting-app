export const maxLength = ( value: string, maxLength: number ): true | string => ( value.length <= maxLength ) || `It is over ${ maxLength } characters long.`;
