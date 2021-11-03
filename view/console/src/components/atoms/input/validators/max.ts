export const max = ( value: number | string, max: number | string ): true | string => ( value <= max ) || `The maximum value of ${ max } has been exceeded`;
