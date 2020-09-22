const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugins = require('optimize-css-assets-webpack-plugin')

module.exports = {
    runtimeChunk: {
        name: 'minifest',
    },
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test: /[[\\/]node_modules[\\/]]/,
                name: 'vender',
                chunks: 'all'
            }
        },
    },
    minimizer: [
        new UglifyJSPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    pure_funcs: ["b_io"]
                }
            }
        }),
        new OptimizeCssAssetsPlugins({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                reduceIdents: false,
                autoprefixer: false,
            }
        })
    ],
    usedExports: false,
}