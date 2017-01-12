module.exports = {
  entry: './src',
  output: {
    path: 'dist',
    filename: 'baza-contentmeter.js'
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    }]
  }
};
