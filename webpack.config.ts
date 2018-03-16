// tslint:disable-next-line
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      "whatwg-fetch",
      "./src/app",
    ],
  },
  output: {
    path: `${__dirname}/public/`,
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
          }
        }
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
    new ExtractTextPlugin("styles.css"),
  ],
};
