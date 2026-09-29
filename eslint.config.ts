import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import react from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default defineConfig(
  globalIgnores(['build/', 'tests/results/']),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
    rules: {
      'import-x/no-extraneous-dependencies': 'error',
      // TypeScript already checks these, and they misfire on CommonJS packages like react
      'import-x/default': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      react.configs['recommended-type-checked'],
      jsxA11y.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
      '@eslint-react/naming-convention-ref-name': 'off',
    },
  },
  {
    files: ['*.config.ts', 'tests/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  // turns off stylistic rules, letting Prettier handle them
  prettier,
);
