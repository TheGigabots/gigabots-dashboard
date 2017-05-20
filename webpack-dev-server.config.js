const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    // Entry points to the project
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.js'),
    ],
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        devtool: 'source-map',
        hot: true, // Live-reload
        inline: true,
        historyApiFallback: true, // This makes the react-router routes not 404 and bork
        port: 3000, // Port Number
        host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
    },
    devtool: 'source-map',
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('flexbox.css', {allChunks: true}),  // compiled css (single file only)
        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ],
    module: {
        loaders: [
            {
                // React-hot loader and
                test: /\.js$/, // All .js files
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,presets[]=stage-1,plugins[]=transform-class-properties'], // react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [nodeModulesPath],
            },
            {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
            }
        ],
    },
};

module.exports = config;
