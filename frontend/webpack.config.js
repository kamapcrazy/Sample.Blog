const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

const {
    AngularCompilerPlugin
} = require('@ngtools/webpack');


const helpers = require('./helpers');

module.exports = {
    target: 'web',
    entry: {
        main: helpers.root('src', 'main.ts')
    },
    resolve: {
        extensions: ['.ts', '.js', '.html']
    },
    output: {
        path: helpers.root('dist'),
        publicPath: './',
        filename: '[id].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: helpers.root('dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "@ngtools/webpack"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: helpers.root('src', 'assets'),
            to: helpers.root('dist', 'assets')
        }]),
        new HtmlWebPackPlugin({
            template: helpers.root('src', 'index.html'),
            filename: helpers.root('dist', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.json'),
            entryModule: helpers.root('src', 'app', 'app.module#AppModule'),
            sourceMap: true
        }),
        new WriteFilePlugin()
    ]
}