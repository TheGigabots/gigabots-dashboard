const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // Entry points to the project
    entry: {
        app: ['babel-polyfill',
            'react-hot-loader/patch',
            './src/app/app.js']
    },
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        hot: true, // Live-reload
        inline: true,
        historyApiFallback: true, // This makes the react-router routes not 404 and bork
        port: 3000, // Port Number
        host: '0.0.0.0',
        disableHostCheck: true
    },
    devtool: "source-map",
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('flexbox.css', {allChunks: true}),  // compiled css (single file only)
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-stage-2','@babel/preset-react']
                    }
                }
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css-loader?importLoaders=1'])
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }

        ],
    },
};



