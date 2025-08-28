import js from '@eslint/js';
import litPlugin from 'eslint-plugin-lit';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    plugins: {
      lit: litPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        CustomEvent: 'readonly',
        FormData: 'readonly',
        customElements: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        fetch: 'readonly',
        bootstrap: 'readonly'
      }
    },
    rules: {
      // ESLint recommended rules
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'off', // Allow console for debugging
      'prefer-const': 'error',
      'no-var': 'error',
      'no-useless-catch': 'off', // Allow try/catch for API error handling
      
      // Code style rules
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      
      // Lit-specific rules
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-template-bind': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/attribute-value-entities': 'error',
      'lit/binding-positions': 'error',
      'lit/no-invalid-html': 'error',
      'lit/no-value-attribute': 'error'
    }
  },
  {
    files: ['*.cjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  prettierConfig
];
