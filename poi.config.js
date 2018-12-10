module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist',
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
