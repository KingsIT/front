const path = require('path');
// const { TsConfigPathsPlugin } = require('awesome-typescript-loader'); // awesome-typescript-loader 时需要引用

const plugins = require('./plugins');
const { resolve } = require('./utils');
const jsRules = require('./rules/jsRules');
const styleRules = require('./rules/styleRules');
const fileRules = require('./rules/fileRules');
const optimization = require('./optimization');
const getMockAPIs = require('../mock/mock');

module.exports = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    target: 'web',
    entry: {
        // home: resolve('src/container/views/Home/index.tsx'),
        // page: resolve('src/container/views/Page/index.tsx'),
        // manage: resolve('src/pages/manage/index.tsx'),
        resume: resolve('src/pages/resume/index.tsx'),
    },
    output: {
        path: path.join(__dirname, './../', 'dist'),
        filename: 'js/[name].js',
    },
    devServer: {
        port: 3000,
        hot: true,
        before(app) {
            getMockAPIs(app)
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: { // ts-loader 是需要配置
            '@/components': resolve('src/components'),
            '@utils': resolve('src/utils'),
            "@views": resolve("src/container/views"),
            "@shared":resolve("src/container/shared"),
            "@assets":resolve("src/assets")
        },
        // plugins: [
        //     new TsConfigPathsPlugin()
        // ],
    },
    module: {
        rules: [...jsRules, ...styleRules, ...fileRules]
    },
    plugins: [...plugins],
    optimization,
    // externals: {
    //     'react': 'window.React',
    //     'react-dom': 'window.ReactDOM'
    // }
}