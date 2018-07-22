const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      "whatwg-fetch",
      "./world-map/app",
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name]-[hash].bundle.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
          },
        },
      },
    ],
  },
  devServer: {
    compress: true,
    port: 8081,
    contentBase: path.join(__dirname, 'world-map'),
  },
  performance: {
    hints: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles-[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./world-map/index.html",
      favicon: "./src/assets/favicon.ico",
    }),
  ],
};
