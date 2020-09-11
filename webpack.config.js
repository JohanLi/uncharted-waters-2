const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: {
      app: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/app',
      ],
    },
    output: {
      path: `${__dirname}/build/`,
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
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'css-loader',
                },
              ],
            },
            {
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                  },
                },
              ],
            },
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
        exclude: [/\.gz$/],
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
            handler: 'CacheFirst',
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
