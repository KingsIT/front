/*
 * @Author: 钱晶晶
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
const argv = require('yargs').argv;

const [targetHostName] = argv._;

// console.log(argv, 'argv===');

const host_map = {
    'staging': 'root@47.114.3.107:/root/front'
}

if (!host_map[targetHostName]) {
    shell.echo("目标主机不存在");
    shell.exit({code: 1});
}
// 1. 通知 开始构建

// 2. 安装依赖
if (shell.exec("npm i").code !== 0) {
    shell.echo("error npm install error");
    shell.exit({code: 1})
}

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
    source: path.resolve(__dirname, '../', 'dist/*'),
    destination: 'root@47.114.3.107:/root/front',
    flags: 'avz',
    shell: 'ssh'
})


rsync.execute(function(err, code, cmd) {
    // console.log(err)
    // console.log(code)
    // console.log(cmd)
    if (err) {
        shell.echo(`error ocurred: ${err}`);
        return
    }
    shell.echo("部署成功");
})

// 各个环境的 机器人 api 不同步骤进行调用通知

// drone 进行前端发布 不用 jekens 部署