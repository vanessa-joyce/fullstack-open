import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginReact from 'eslint-plugin-react'
import js from '@eslint/js' // Diese Zeile fehlt in Ihrem Code

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended, // React recommended config
  pluginReact.configs.flat['jsx-runtime'], // React JSX runtime config
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      'react': pluginReact,
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    ignores: ['dist/**', 'build/**'],
  }
]