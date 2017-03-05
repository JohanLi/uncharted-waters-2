'use strict';

module.exports = {
    entry: {
        app: ['babel-polyfill', 'whatwg-fetch', './app/Game']
    },
    output: {
        path: __dirname + '/public/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/public/'
    },
    performance: {
        hints: false
    }
};