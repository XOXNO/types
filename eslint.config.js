import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import fixUninitializedProperties from './eslint-rules/fix-uninitialized-properties.js';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPluginRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es6,
      },
    },
    plugins: {
      'custom': {
        rules: {
          'fix-uninitialized-properties': fixUninitializedProperties,
        },
      },
    },
    rules: {
      'custom/fix-uninitialized-properties': 'error',
    },
  },
]; 