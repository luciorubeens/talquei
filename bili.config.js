const vue = require('rollup-plugin-vue').default

module.exports = {
  input: 'src/index.js',
  format: ['umd', 'umd-min', 'cjs', 'es'],
  compress: 'umd',
  filename: 'talquei[suffix].js',
  plugins: [
    vue({
      css: false,
    }),
  ],
}
