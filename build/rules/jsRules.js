const tsImportPluginFactory = require('ts-import-plugin');

module.exports = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [ tsImportPluginFactory( [{
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: true
                        }]) ]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
            }
        ],
        exclude: /node_modules/,
    }
]