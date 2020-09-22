const fs = require('fs');

module.exports = function(content) {
    // console.log(content, this.context, '-=-=-=-=-');
    // 返回结果
    const path = this.context;
    fs.writeFile(`${path}/index.scss`, content, function(err) {
    });
    fs.readFile(`${path}/index.tsx`, 'utf8', function(err, data){
        fs.writeFile(`${path}/index.tsx`, data.toString().replace('css', 'scss'), function(err) {
            fs.unlink(`${path}/index.css`, (err1) => {
                if (err1) throw err1;
                console.log('文件已被删除');
            })
        });
    });
    // fs.appendFile(`${path}/index.tsx`, "import styles from './cssloader.less';", (err) => {
    //     console.log('pppppppp');
    // });
    // console.log(`${path}/index.tsx`, 'pp')
    
    this.callback(null, content);
};