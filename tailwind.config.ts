module.exports = {
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  variants: {},
  
  theme: {
    colors: {
      'BackgroundColor':`#131b22`,
      'TitleText':`#fff6a2`,
      'HeaderText': '#fff6a2',
      'Description': '#e9ecef',
      'Date': '#c0becd',
      'Title': '#ffffff'
    },
    extend: {
        typography: {
          DEFAULT: { // this is for prose class
            css: {
              p: {
                color: '#ffffff',
              },
              a: {
                color: '#ffffff',
              },
              h1:{
                color: '#ffffff'
              },
              h2:{
                color: '#ffffff'
              },
              h3:{
                color: '#ffffff'
              },
              h4:{
                color: '#ffffff'
              },
              li:{
                color: '#ffffff'
              }
            },
          },
        },
      }  
  },
  
  darkMode: false, 
};
