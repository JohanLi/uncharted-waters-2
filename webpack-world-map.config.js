const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        test: /\.(mp3|png|bin)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash].[ext]",
              useRelativePath: true,
            },
          },
        ],
      },
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
