module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    'node/no-unpublished-require': 0,
    'security/detect-non-literal-fs-filename': 0,
    'sonarjs/no-duplicate-string': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'global-require': 0,
    'func-names': 0,
    'linebreak-style': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'no-undef': 0,
    radix: [
      'error',
      'as-needed'
    ],
    'max-len': 0
  }
};
