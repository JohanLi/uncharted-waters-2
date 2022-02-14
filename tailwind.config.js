const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/interface/**/*.{ts,tsx}', './src/homepage/index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
