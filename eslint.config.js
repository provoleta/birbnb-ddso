import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, '@stylistic/js': stylisticJs, react: 'eslint-plugin-react' },
    extends: ['js/recommended', 'eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'react/prop-types': 'off', // Desactiva advertencias de prop-types si usas TypeScript o no los usas
      'react/react-in-jsx-scope': 'off', // Desactiva advertencia si usas React 17+
      '@stylistic/js/semi': ['error', 'never'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.{js,mjs,cjs}'],
    languageOptions: { globals: globals.jest },
  },
])
