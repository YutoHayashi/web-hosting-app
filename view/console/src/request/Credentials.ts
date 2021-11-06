export const Credentials = ( args: { jwt: string; } ) => ( {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${ args.jwt }`,
} );
