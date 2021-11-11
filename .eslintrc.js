module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['vue'],
  extends: ['plugin:vue/vue3-recommended', '@vue/standard'],
  parserOptions: {
    ecmaVersion: 2020
  },
  globals: {
    defineProps: 'writable',
    defineEmits: 'writable',
    defineExpose: 'writable',
  },
  rules: {
    'eol-last': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    indent: 'off',
    'no-tabs': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
}
