const { resolve } = require('path');

module.exports = [
    {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        include: resolve('src'),
    }, 
    {
        test: /\.md$/,
        use: ['html-loader', {
            loader: resolve('build/customerJs/loader.js'),
            options: {
                simplifiedAutoLink: true,
                tables: true
            }
        }],
    }, 
    {
        test: /\.css$/,
        use: [{
            loader: resolve('build/customerJs/cssloader.js'),
            options: {
                simplifiedAutoLink: true,
                tables: true,
                emitFile: true
            }
        }],
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
            loader: 'url-loader'
        },
        include: resolve('src'),
    }
]