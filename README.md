#### webpack 配置说明
    - ts-node-dev: 直接执行并且监听 ts 文件的变化
    - prettier: 格式校验
    - tslint: 检查项目文件的命名、变量的命名等等
    - tslint-config-prettier: 根据 prettier 定义的 tslint 规则
    - commitizen: git commit 规范
    - validate-commit-msg: 在 git 提交的时候进行 commit 规范的检查  需要配置 .vcmrc 文件来做校验规则的编写
    - husky: git 规则不规范时会在控制太报错
    - npm-run-all: 运行多条 npm run 命令
        - 提供两个命令 run-s 串行执行多条命令 run-p 并行执行多条命令