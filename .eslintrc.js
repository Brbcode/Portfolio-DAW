module.exports = {
  extends: ['airbnb'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true, // add this line
    },
  },
  rules: {
    // your rules here
    'react/jsx-props-no-spreading': 'off',
  },
};
