const { name } = require('./package')

module.exports = {
  babel: {
    transpileModules: ['vue-typed-js'],
  },
  entry: 'example/index.js',
  output: {
    dir: 'example/dist',
    html: {
      template: 'example/index.html',
    },
    publicUrl: process.env.NODE_ENV === 'production' ? `/${name}/` : '/',
  },
  plugins: [
    {
      resolve: '@poi/plugin-eslint',
    },
  ],
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.css'],
    },
  },
}
