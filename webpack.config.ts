// tslint:disable:no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|json)$/,
        type: "javascript/auto", // https://github.com/webpack/webpack/issues/6586
        use: [
          {
            loader: "file-loader",
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
    contentBase: `${__dirname}/public/`,
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
    }),
  ],
};
