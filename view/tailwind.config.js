const colors = require( 'tailwindcss/colors' );
module.exports = {
    purge: [ './src/**/*.{js,jsx,ts,tsx}', './index.html' ],
    darMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require( '@tailwindcss/forms' ),
    ],
}
