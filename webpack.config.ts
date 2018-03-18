// tslint:disable:no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      "whatwg-fetch",
      "./src/app",
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name]-[hash].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(json|mp3|png)$/,
        type: "javascript/auto", // https://github.com/webpack/webpack/issues/6586
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
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
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
      template: "./src/assets/index.html",
      favicon: "./src/assets/favicon.ico",
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
