import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import i18next from 'i18next';
interface Props {
    title: string;
    description: string;
}
export const Seo: React.FC<Props> = ( _props ) => {
    const router = useRouter(  );
    const { title, description } = _props;
    const lang = i18next.language;
    const url = `${ process.env.NEXT_PUBLIC_DOMAIN }${ router.pathname }`.replace( /\[lang\]/, lang );
    return (
        <Head>
            <title>{ title }</title>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={ title } key="title" />
            <meta name="description" content={ description } />
            <meta name="robots" content="noindex,nofollow" />
            <meta property="og:url" content={ url } />
            <meta property="og:title" content={ title } />
            <meta property="og:type" content='website' />
            <meta property="og:description" content={ description } />
            <meta property="og:image" content="画像のURL" />
            <meta name="twitter:card" content="summary" />
            <meta property="og:site_name" content={ process.env.NEXT_PUBLIC_NAME } />
            <meta property="og:locale" content={ lang } />
            <meta property="fb:app_id" content={ process.env.NEXT_PUBLIC_FACEBOOK_ID } />
        </Head>
    );
};
