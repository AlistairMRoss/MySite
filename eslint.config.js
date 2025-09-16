import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
  {
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'no-undef': 'off'
    }
  },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    ignores: [
      'web/node_modules/',
      'web/dist/',
      '/build/',
      'web/.svelte-kit/',
      '/coverage/'
    ]
  },
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./server/core/tsconfig.json', './server/functions/tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      globals: globals.node
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs['recommended'].rules,
      ...ts.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/indent': ['error', 2],
      'indent': 'off',
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always']
    }
  },
  {
    files: ['web/src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './web/tsconfig.json',
        tsconfigRootDir: __dirname
      },
      globals: globals.browser
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/indent': ['error', 2],
      'indent': 'off',
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'no-debugger': 'error'
    }
  },
  {
    files: ['web/src/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.json',
        tsconfigRootDir: path.join(__dirname, 'web'),
        extraFileExtensions: ['.svelte']
      },
      globals: globals.browser
    },
    plugins: { svelte, '@typescript-eslint': ts },
    rules: {
      ...svelte.configs.recommended.rules,
      'no-unused-vars': ['error', {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
      }],
      'svelte/no-unused-svelte-ignore': 'off',
      'svelte/no-target-blank': 'error',
      'svelte/no-at-debug-tags': 'warn',
      'svelte/valid-compile': 'error',
      'svelte/indent': ['error', { indent: 2 }],
      '@typescript-eslint/indent': 'off',
      'indent': 'off',
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always']
    }
  },
  {
    files: ['web/src/**/*.{ts,svelte}'],
    ignores: ['*.d.ts'],
    rules: {
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      '@typescript-eslint/indent': ['error', 2],
      'svelte/indent': ['error', { indent: 2 }],
      'indent': 'off',
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always']
    }
  }
]