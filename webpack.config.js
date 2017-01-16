module.exports = {
  entry: './src',
  output: {
    library: 'ContentMeter',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'baza-contentmeter.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/
      },
      {
        loader: 'webpack-comment-remover-loader',
        test: /\.js?$/,
        exclude: /node_modules/
      }
    ]
  }
};
