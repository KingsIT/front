import t from '@babel/types';
import parser from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import fs from 'fs';

fs.readFileAsync('/Users/qianjingjing/Desktop/projects_own/front/src/pages/resume/containers/firstFloor/index.tsx', 'utf-8', (err, data) => {
    // console.log(data, '====');
    if (err) {
        console.log(err);
        return
    }
    var orginCode = data;   // 原始代码
    // 生成原始AST
    var originAST = parser.parse(orginCode, {
        sourceType: "module",
        plugins: [
            'jsx',
        ],
    });
    // console.log(originAST, 'originAST=========')
    // 对AST进行遍历并操作
    traverse.default(originAST,{
        enter(path) {
            path.traverse({
                ImportDeclaration (p, s) {
                    console.log('processing ImportDeclaration====>', p.node.source.value);
                }
            },)
        },
        // FunctionDeclaration(path) {
        //     // console.log(path, 'FunctionDeclaration')
        // }, 
        // ExpressionStatement(path) {
        //     console.log(path.node, 'ExpressionStatement')
        // },
        // Identifier(path){
        //     // console.log(path);
        //     const {node} = path;
        //     // const {node} = path;
        //     // 找到findEleById，将其替换成为目标节点
        //     if(node && node.name === "findEleById"){
        //         var newNode = t.memberExpression(t.identifier("document"), t.identifier("getElementById")); // 创建目标节点
        //         path.replaceWith(newNode);  // 替换原始节点
        //         path.stop();
        //     }
        // }
    });
    const targetCode = generate.default(originAST, { /* options */ }, orginCode);   // 将转换后的AST生成目标代码
})

