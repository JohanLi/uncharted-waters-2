'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './app/Game']
  },
  output: {
    path: __dirname + '/public/',
    filename: '[name].bundle.js'
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public/',
    compress: true,
    port: 8081
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
};