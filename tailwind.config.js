const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/homepage/index.html',
    './src/interface/**/*.{ts,tsx}',
    './src/data/characterData.ts',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
