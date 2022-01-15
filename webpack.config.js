// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    mode: 'development',
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
  }

  return config;
};
