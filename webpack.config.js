// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ogg|mp3|png|bin)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/interface/index.html',
        favicon: './src/interface/favicon.ico',
      }),
    ],
  };

  if (isProduction) {
    config.mode = 'production';
    delete config.devtool;

    /*
      The tilemap bin files are large, but compress to less than 100 kb each.
      As of now, Brotli is still non-trivial to set up for nginx, so we’ll
      use gzip.
      Another approach is to add a MIME type for bin, and rely on Cloudflare’s
      Brotli compression.
     */
    config.plugins.push(
      new CompressionPlugin({
        test: /\.(js|css|html|bin)$/,
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
    config.plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));
  }

  return config;
};
