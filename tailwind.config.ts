module.exports = {
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  variants: {},
  theme: {
    colors: {
      'background':'#b3cee9',
      'TitleText':`#121517`,
      'HeaderText': '#171A1B',
      'Description': '#48525d ',
      'Date': '#5a6775',
      'Title': '#121517 '
    },
    extend: {},
  },
  darkMode: false, 
};