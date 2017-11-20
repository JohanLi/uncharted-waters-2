const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './app/Port'],
  },
  output: {
    path: `${__dirname}/public/`,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ]
  },
  devServer: {
    contentBase: `${__dirname}/public/`,
    compress: true,
    port: 8081,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};
