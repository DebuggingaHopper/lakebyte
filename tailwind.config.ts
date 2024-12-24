module.exports = {
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  variants: {},
  theme: {
    colors: {
      'BackgroundColor':`#f0eadc`,
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