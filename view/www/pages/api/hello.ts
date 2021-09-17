// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export const org = {
  register: async ( params: Data ): Promise<object> => {
    let data = {};
    return new Promise( ( resolve, reject ) => {
      try {

      } catch( e ) {
        reject( e );
      } finally {
        resolve( data );
      }
    } )
  }
}
