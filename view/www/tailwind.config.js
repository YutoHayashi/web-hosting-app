module.exports = {
  purge: {
    content: [ './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}' ],
    options: {
      safelist: [ 'bg-blue-500', 'hover:bg-blue-400', 'bg-red-500', 'hover:bg-red-400', 'bg-yellow-500', 'hover:bg-yellow-400', 'bg-green-500', 'hover:bg-green-400', 'bg-gray-500', 'hover:bg-gray-400', 'bg-indigo-500', 'hover:bg-indigo-400', 'bg-purple-500', 'hover:bg-purple-400', 'bg-pink-500', 'hover:bg-pink-400', ],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require( '@tailwindcss/forms' ),
  ],
  important: false,
}
