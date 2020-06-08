module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'google',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true,
      spread: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false,
        },
      },
    ],
    camelcase: ['off', 'always'],
  },
};
