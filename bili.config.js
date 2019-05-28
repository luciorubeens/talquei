module.exports = {
  input: 'src/index.js',
  output: {
    extractCSS: true,
    moduleName: 'Talquei',
    format: ['umd', 'umd-min', 'cjs', 'es'],
    fileName: ({ format }) => {
      return ['umd', 'umd-min'].includes(format)
        ? '[name][min].js'
        : '[name][min].[format].js'
    },
  },
  plugins: {
    vue: true,
  },
}
