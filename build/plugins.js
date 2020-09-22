const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {resolveAssetsRootDir} = require('./utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LifeCycleWebpackPlugin } = require('lifecycle-webpack-plugin');
const MyPlugin = require('./customerJs/myPlugin');
const InOrNotINPlugin = require('./customerJs/InOrNotINPlugin');
const LifeCofPlugin = require('./customerJs/lifeCofPlugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = [
    // new HtmlWebpackPlugin({
    //     template: 'build/index.html',
    //     filename: 'index.html',
    //     chunks: ['manage'], // 添加多入口对应的chunk 到template 文件中
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: true,
    //         removeAttributeQuotes: true,
    //     },
    //     inject: true,
    //     hash: true,
    // }),
    new HtmlWebpackPlugin({
        inject: true,
        // hash: true,
        // filename: 'resume.html',
        template: 'build/resume.html',
        title: '放飞自我的介绍',
        chunks: ['resume'], // 添加多入口对应的chunk 到template 文件中
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: resolveAssetsRootDir('css/[name].css'),
    }),
    new CleanWebpackPlugin(),
    new LifeCycleWebpackPlugin({
        done: (compiler) => {
            // console.log(compiler, new Date(), '=====');
        },
    }),
    new MyPlugin(),
    new LifeCofPlugin(),
    new BundleAnalyzerPlugin(),
    new InOrNotINPlugin(),
]