module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'linebreak-style': 0,
    'comma-dangle': ['warn', 'never'],
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-globals': 'off',
    'no-return-assign': 'warn',
    'react/jsx-closing-tag-location': 'off',
    'no-param-reassign': 'warn',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'warn',
    'arrow-parens': 'off',
    'arrow-body-style': ['warn', 'as-needed'],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'no-console':'off',
    'no-useless-constructor': 'warn',
    'no-empty-function': 'warn',
    
    '@typescript-eslint/triple-slash-reference': 'off',
    quotes: ['warn', 'single'],
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off',

    'react/jsx-wrap-multilines': [
      'warn',
      {
        arrow: true,
        return: true,
        declaration: true
      }
    ],
    'no-use-before-define': 'off',
    camelcase: 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/require-default-props': 'off',
    'react/static-property-placement': 'off',
    'max-classes-per-file': 'off',
    'func-names': 'warn',
    'no-shadow': 'off',
    'react/jsx-fragments':'off',
    'react/destructuring-assignment':'off',
    'react/jsx-wrap-multilines':'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/no-unescaped-entities': 'off',
    'react/button-has-type': 'off',
    'dot-notation': 'off',
    'react/default-props-match-prop-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off', // maybe change later
    'jsx-a11y/media-has-caption': 'off',
    'consistent-return': 'off',
    'new-cap': 'off',
    'import/extensions': 'off',
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'import/prefer-default-export': 'off',
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/sort-comp': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    'jsx-a11y/no-noninteractive-element-interactions':'off',
    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }]
  }
};
