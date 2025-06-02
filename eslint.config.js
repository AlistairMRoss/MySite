import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  {
    ignores: ['svelte.config.js', 'eslint.config.js'],
  },
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      'no-multi-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' },
      ],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'keyword-spacing': 'error',
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'computed-property-spacing': ['error', 'never'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
      },
    },
    rules: {
      'svelte/no-at-html-tags': 'error',
      'svelte/valid-compile': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/no-reactive-reassign': 'error',
      'svelte/no-store-async': 'error',
      'svelte/no-immutable-reactive-statements': 'error',
      'svelte/no-unused-class-name': 'error',
      'svelte/prefer-destructured-store-props': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'svelte/indent': ['error', { indent: 2 }],
    },
  }
);