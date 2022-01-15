// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    mode: 'development',
    entry: './src/app',
    output: {
      filename: '[name]-[contenthash].bundle.js',
      path: `${__dirname}/build/`,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(mp3|png|bin)$/,
          type: 'asset/resource',
        },
      ],
    },
    // following recommendations from https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',
    devServer: {
      static: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/interface/index.html',
        favicon: './src/interface/assets/favicon.ico',
      }),
    ],
  };

  if (isProduction) {
    config.mode = 'production';
    delete config.devtool;

    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        test: /\.(js|css|html|bin)$/,
      })
    );
  }

  return config;
};
