/*
 * @Author: your name
 * @Date: 2020-09-22 23:27:38
 * @LastEditTime: 2020-09-23 00:11:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\scripts\deploy.js
 */

/**
 * rsync: 做增量发布，没有差异的文件不会做同步工作
 * shelljs 可以执行 linux 命令
 */
// CI/CD 流程
const shell = require('shelljs');
const Rsync = require('rsync');
const path = require('path');

// 1. 通知 开始构建

// 2. 安装依赖
// if (shell.exec("npm i").code !== 0) {
//     shell.echo("error npm install error");
//     shell.exit({code: 1})
// }

// // 3. 测试
// if (shell.exec("npm run test").code !== 0) {
//     shell.echo("error npm run test error");
//     shell.exit({code: 1})
// }
// // 4. 构建项目
// if (shell.exec("npm run build").code !== 0) {
//     shell.echo("error npm run build error");
//     shell.exit({code: 1})
// }

// // 5. 部署环境
const rsync = Rsync.build({
    source: path.join(__dirname, '../', 'E:\\front\\dist\\*'),
    destination: 'root@47.114.3.107:/root/front',
    flags: 'avz',
    shell: 'ssh'
})

rsync.execute(function(err, code, cmd) {
    console.log(err)
    console.log(code)
    console.log(cmd)
})