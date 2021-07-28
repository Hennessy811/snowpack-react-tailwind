const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.tsx', './src/**/*.js', './src/**/*.ts'],
  theme: {
    extend: {
      colors: {
        mainGreen: {
          light: '#DFF5F4',
          DEFAULT: '#3E8896',
          old: '#00A9AB',
        },
        mainYellow: {
          DEFAULT: '#FFCC44',
        },
        // mainGreen: {
        //   DEFAULT: "#00A9AB"
        // },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
