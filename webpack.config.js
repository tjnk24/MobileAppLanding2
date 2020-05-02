const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const development = process.env.NODE_ENV !== 'production';

const cssLoaders = [
    {
        loader : 'style-loader',
        options: {
            hmr: true
        }
    },
    {
        loader : 'css-loader',
        options: {
            sourceMap: true,
            minimize: !development,
            module: true,
            localIdentName: '[local]'
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                precss(),
                autoprefixer()
            ]
        }
    }
];

const config = {
    context: __dirname + '/src',
    entry: [
        'js/main.js'
    ],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: development ? 'eval-source-map' : undefined,
    mode: development ? 'development' : 'production',
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 8080,
        host: 'localhost',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: development ? cssLoaders : ExtractTextPlugin.extract({use: [cssLoaders[1], cssLoaders[2]], fallback: 'style-loader'})
            },
            {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                loader: 'file-loader',
                options: {
                    context: path.resolve(__dirname, 'src'),
                    publicPath: development ? undefined : '../',
                    name: '[path][name].[ext]',
                    limit: 1000
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('build'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin({
            filename : 'css/main.css',
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: 'img', to: 'img' }
        ]),
        new UglifyJsPlugin()
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    }
};

module.exports = config;
