module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist'
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.css']
    }
  }
}
