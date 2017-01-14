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
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    }]
  }
};
