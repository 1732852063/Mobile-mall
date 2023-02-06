module.exports = {
    root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
  },
  // 'parser': '@typescript-eslint/parser',
  // 'parserOptions': {
  //   'parser': 'babel-eslint',
  // },

}
