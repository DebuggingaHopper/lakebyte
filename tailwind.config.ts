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
      'Title': '#ffffff',
      'PaginationBg': '#334155',        // slate-700 equivalent
      'PaginationBgHover': '#475569',   // slate-600 equivalent
      'PaginationDisabled': '#1e293b',  // slate-800 equivalent
      'PaginationText': '#f1f5f9',      // slate-100 equivalent
      'PaginationTextDisabled': '#64748b', // slate-500 equivalent
      'PaginationActive': '#fff6a2',    // Your yellow
      'PaginationActiveText': '#0f172a', // slate-900 equivalent
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
