import merge from 'webpack-merge';
import webpackConfig from './webpack.config';

module.exports = merge(webpackConfig, {
  devtool: 'eval-source-map'
});
