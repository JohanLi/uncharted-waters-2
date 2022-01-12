// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
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
          test: /\.(json|mp3|png|bin)$/,
          type: 'asset/resource',
        },
      ],
    },
    // following recommendations from https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? false : 'eval-source-map',
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
};
