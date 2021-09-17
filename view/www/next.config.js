/** @type {import('next').NextConfig} */
module.exports = {
    env: {
        NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
        NEXT_PUBLIC_NAME: process.env.NEXT_PUBLIC_NAME,
        NEXT_PUBLIC_FACEBOOK_ID: process.env.NEXT_PUBLIC_FACEBOOK_ID,
        NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
        NEXT_PUBLIC_LOCALES: process.env.NEXT_PUBLIC_LOCALES,
        NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
    reactStrictMode: true,
    webpack: ( config, options ) => {
        config.experiments = {
            topLevelAwait: true,
        };
        return config;
    },
};
