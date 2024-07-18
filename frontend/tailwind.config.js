/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      fontFamily: {
         Roboto: ['Roboto', 'sans-serif'],
         Poppins: ['Poppins', 'sans-serif'],
      },
      extend: {
         screens: {
            '1300px': '1300px',
            '1100px': '1110px',
            '1000px': '1050px',
            '800px': '800px',
            '400px': '400px',
         },
         colors: {
            primary: {
               0: '#FFF5F7',
               10: '#FFF3F5',
               20: '#FFF1F3',
               30: '#FFEFF2',
               40: '#FFEDF0',
               50: '#ffeaee',
               100: '#fec0cc',
               200: '#fd97aa',
               300: '#fc6d88',
               400: '#fb4366',
               500: '#fb1a44',
               600: '#e5042f',
               700: '#D6042C',
               800: '#bc0427',
               900: '#92031e',
               950: '#680215',
            },
         },
      },
   },
   plugins: [],
};
