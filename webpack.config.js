'use strict';

module.exports = {
    entry: {
        app: './app/Game'
    },
    output: {
        path: __dirname + '/public/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
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