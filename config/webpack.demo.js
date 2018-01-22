import path from 'path';
import webpack from 'webpack';

const rootPath = '../';

module.exports = {
  cache: true,
  entry: path.resolve(__dirname, rootPath, 'docs/scripts/main.js'),
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, rootPath, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['babel-plugin-add-module-exports']
        }
      }
    ]
  },
  watch: false,
  devtool: 'source-map'
};
