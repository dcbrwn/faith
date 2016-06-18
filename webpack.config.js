var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'faith.js',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jade$/,
        exclude: ['node_modules'],
        loader: 'jade-loader?self',
      },
      {
        test: /\.ts$/,
        exclude: ['node_modules'],
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        exclude: ['node_modules'],
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};
