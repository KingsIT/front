#### 依赖 配置说明
    - ts-node-dev: 直接执行并且监听 ts 文件的变化
    - prettier: 格式校验
    - tslint: 检查项目文件的命名、变量的命名等等
    - tslint-config-prettier: 根据 prettier 定义的 tslint 规则
    - commitizen: git commit 规范
    - validate-commit-msg: 在 git 提交的时候进行 commit 规范的检查  需要配置 .vcmrc 文件来做校验规则的编写
    - husky: git 规则不规范时会在控制台报错
    - npm-run-all: 运行多条 npm run 命令
        - 提供两个命令 run-s 串行执行多条命令 run-p 并行执行多条命令
    - awesome-typescript-loader, ts-loader 将 ts 转换成 js, 安装一个就行
    - typings-for-css-modules-loader, 需要搭配 css-loader@1.0使用
        - 配合ts自动生成 ts 参数格式校验校验文件
        - 需要通过 typings/typed-css-modules.d.ts 配置 export 对像， 因为 scss 本身不含这个 export
            ```
                declare module '*.scss' {
                    const content: any
                    export = content
                }
            ```
    - ts-import-plugin, 按需加载引入antd 样式组件
    - @types/webpack-env 解决 属性 hot 在类型 NodeModule 上不存在的报错
    - cross-env, 设置 process.env.NODE_ENV 变量
    - @svgr/webpack, 集成 svg
    - mini-css-extract-plugin 分离css chunk
    - react-loadable, react-router-dom 代码分割
    - optimize-css-assets-webpack-plugin 压缩css
    - uglifyjs-webpack-plugin 压缩 js
    - file-loader 能够根据配置项复制使用到的资源（不局限于图片）到构建之后的文件夹，并且能够更改对应的链接
    - url-loader 包含 file-loader 的全部功能，并且能够根据配置将符合配置的文件转换成 Base64 方式引入，将小体积的图片 Base64 引入项目可以减少 http 请求，也是一个前端常用的优化方式。

#### webpack 配置说明
    - 扩展名省略配置
    ```
        resolve: {
            extensions: ['ts', 'tsx', 'js', 'jsx'],
        }

        // 需要配置以下选项的 exclude 属性，否则会编译失败
        {
            test: /\.ts(x?)$/,
            use: [
                'ts-loader'
            ],
            exclude: /node_modules/
        },
    ```

#### 配置别名
    ```
        // webpack.config.js
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@components': path.join(__dirname, './../', 'src/components')
            }
        },

        // tsconfig.json
        {
            "compilerOptions": {
                ...
                "baseUrl": "./src",  // 必须配置
                "paths": {
                    "@components/*": ["components/*"]
                }
            }
        }

        // 也可以使用 tsconfig-paths-webpack-plugin 进行配置
    ```