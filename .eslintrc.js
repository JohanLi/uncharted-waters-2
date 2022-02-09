/*
 This file, along with most of the eslint dependencies, has been set up
 through eslint --init
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    // this disables all the stylistic rules of the above, letting prettier handle it outside eslint
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: 'cypress',
  rules: {
    // https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    /*
     TypeScript does not seem to pick up defaultProps on functional components.
     Optional props will be receiving default values on destructuring.
     */
    'react/require-default-props': 'off',
  },
};
