const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require('./../utils');

module.exports = [
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            {
                loader: 'typings-for-css-modules-loader',
                options: {
                    modules: true,
                    namedExport: true,
                    camelCase: true,
                    sass: true,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    // 引入指定文件夹文件时，可以不用带上全部路径信息，直接引用文件名即可
                    sassOptions: {
                        indentWidth: 4,
                        includePaths: [resolve('src/styles')], // 设置scss的路径
                    },
                }
            }
        ]
    },
    {
        test: /\.less$/,
        include: [resolve('/node_modules/')],
        use: [
            // 'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: { '@primary-color': '#1DA57A' },
                    },
                }
            }
        ],
    }
]