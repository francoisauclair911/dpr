module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'unicorn/escape-case': 'off',
    'no-unreachable': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-undef': 'off',
    'vue/no-unused-components': 'off',
    'vue/valid-v-slot': 'off',
    // 'vue/valid-v-slot': ['error', { allowModifiers: true }],
  },
}
