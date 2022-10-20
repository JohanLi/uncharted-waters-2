// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: './src/app',
    output: {
      filename: '[contenthash].js',
      path: `${__dirname}/build/`,
      assetModuleFilename: '[name]-[contenthash][ext]',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ogg|mp3|png|bin)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/homepage/index.html',
        favicon: './src/homepage/favicon.ico',
      }),
    ],
  };

  if (isProduction) {
    config.mode = 'production';
    delete config.devtool;

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
      }),
    );
  } else {
    config.mode = 'development';

    // following recommendations from https://webpack.js.org/configuration/devtool/
    config.devtool = 'eval-source-map';

    config.devServer = {
      static: false,
    };

    config.module.rules[0].options = {
      plugins: [require.resolve('react-refresh/babel')],
    };
    config.plugins.push(
      new ReactRefreshWebpackPlugin({ overlay: false }),
      new MiniCssExtractPlugin(),
    );
  }

  return config;
};
