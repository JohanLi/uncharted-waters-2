const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/app',
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(json|mp3|png|bin)$/,
        type: 'javascript/auto', // https://github.com/webpack/webpack/issues/6586
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              useRelativePath: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    compress: true,
    port: 8081,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
