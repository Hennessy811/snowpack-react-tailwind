const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.tsx', './src/**/*.js', './src/**/*.ts'],
  theme: {
    extend: {
      height: {
        550: '550px',
      },
      colors: {
        mainGreen: {
          light: '#DFF5F4',
          DEFAULT: '#3E8896',
          old: '#00A9AB',
        },
        mainYellow: {
          DEFAULT: '#FFCC44',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
