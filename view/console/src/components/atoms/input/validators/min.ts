export const min = ( value: number | string, min: number | string ): true | string => ( value >= min ) || `The minimum value of ${ min } has been belowed`;
