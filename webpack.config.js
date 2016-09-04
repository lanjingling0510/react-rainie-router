/* eslint-disable */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var EXAMPLES_DIR = path.resolve(__dirname, 'examples');


module.exports = {
    entry: buildEntries(),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }],
    },
    output: {
        path: 'examples/__build__',
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "[name].chunk.js"
    },
    devTool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'example',
            template: 'examples/index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};


function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce(function (a, b) {
        if (b === '__build__') {
            return a;
        }

        var isDraft = b.charAt(0) === '_';

        if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, b))) {
            a[b] = path.join(EXAMPLES_DIR, b, 'index.js');
        }

        return a;
    }, {});
}


function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
