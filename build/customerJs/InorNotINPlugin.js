const parser = require('@babel/parser');
const generate = require('@babel/generator');
const traverse = require('@babel/traverse');
const fs = require('fs');

class InOrNotINPlugin {
    constructor() {
       this.importFilesName = [];
       this.readFile = this.readFile.bind(this);
    }

    getPathPrefix(pathname, mark = '/', normal = true) {
        if (!pathname && (typeof pathname !== 'string')) return
        console.log(pathname)
        const position = normal ? pathname.lastIndexOf(mark) : pathname.indexOf(mark);
        return normal ? pathname.slice(0, position) : pathname.slice(position);
    }

    readFile1(p, cur) {
        return new Promise((resolve, reject) => {
            if(!p) {
                reject();
            }
            const that = this;
            let orginCode = fs.readFileSync(p, 'utf-8');
            // 生成原始AST
            const originAST = parser.parse(orginCode, {
                sourceType: "module",
                plugins: [
                    'jsx',
                    'tsx',
                ],
            });
            // 对AST进行遍历并操作
            traverse.default(originAST,{
                enter(path) {
                    path.traverse({
                        ImportDeclaration (pi, s) {
                            const importValue = pi.node.source.value;
                            that.importFilesName.indexOf(importValue) === -1
                                && (that.importFilesName.push(importValue));
                        }
                    },)
                },
            });
            resolve();
        })
    }
    
    readFile(p, cur) {
        if(!p) return;
        const that = this;
        fs.readFileSync(p, 'utf-8', (err, data) => {
            if (err) {
                return
            }
            const orginCode = data;   // 原始代码
            // 生成原始AST
            const originAST = parser.parse(orginCode, {
                sourceType: "module",
                plugins: [
                    'jsx',
                    'tsx',
                ],
            });
            // 对AST进行遍历并操作
            traverse.default(originAST,{
                enter(path) {
                    path.traverse({
                        ImportDeclaration (pi, s) {
                            const importValue = pi.node.source.value;
                            that.importFilesName.indexOf(importValue) === -1
                                && (that.importFilesName.push(importValue));
                        }
                    },)
                },
            });
            // 将转换后的AST生成目标代码
            // const targetCode = generate.default(originAST, { /* options */ }, orginCode);
        })
    }
    apply(compiler) {
        compiler.hooks.emit.tap('InOrNotINPlugin', (compilation) => {
            // console.log(Object.keys(compilation), 'compilation===PPP')
            const array = Array.from(compilation.fileDependencies).filter(filename => filename.includes('/src/') && filename.includes('.tsx'));
            // console.log(array);
            array.forEach(async (item, index)=> {
                await this.readFile1(item, index);
            })
            console.log(this.importFilesName.filter(name => name.includes('@') || name.includes('@/') || name.includes('./')));
            // 返回 true 以输出 output 结果，否则返回 false
            return true;
        });
    }
}
module.exports = InOrNotINPlugin;