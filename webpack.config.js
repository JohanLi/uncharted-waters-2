const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: {
      app: [
        '@babel/polyfill',
        './src/app',
      ],
    },
    output: {
      path: `${__dirname}/dist/`,
      filename: '[name]-[contenthash].bundle.js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
              ],
            },
            {
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[path][name]__[local]--[contenthash:base64:5]',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.(json|mp3|png|bin)$/,
          type: 'asset/resource',
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      compress: true,
      port: 8080,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles-[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.ico',
      }),
    ],
  };

  if (argv.mode === 'production') {
    config.plugins.push(
      new CompressionPlugin({
        test: /\.bin/,
      }),
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
            handler: 'cacheFirst',
            options: {
              cacheName: 'google-fonts',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }),
    );
  }

  return config;
};
