import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteParser from 'svelte-eslint-parser'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte']
      }
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte']
      }
    },
    rules: {
      'svelte/indent': ['error', { indent: 2 }]
    }
  },
  {
    files: ['*.config.*', 'vite.config.*', 'svelte.config.*'],
    languageOptions: {
      parserOptions: {
        project: null
      }
    }
  }
]
