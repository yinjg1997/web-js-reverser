const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");
const vm = require('vm');


// 解16进制混淆
function initDecoder(code) {
    const ast = parser.parse(code)

    traverse(ast, {
        StringLiteral(path) {
            path.replaceWith(t.stringLiteral(path.node.value))
            path.skip() // 跳过新节点，防止再次进入这个 visitor 死循环
        }
    })

    return generator(ast, { jsescOption: { minimal: true } }).code
}

function resolveDecoderCalls(code, $dbsm_0x4f3f) {
    const ast = parser.parse(code)
    traverse(ast, {
        CallExpression(path) {
            const { callee, arguments: args } = path.node;
            if (
                callee.type === "Identifier" &&
                callee.name === "$dbsm_0x4f3f" &&
                args.length === 2 &&
                args[0].type === "StringLiteral" &&
                args[1].type === "StringLiteral"
            ) {
                const result = $dbsm_0x4f3f(args[0].value, args[1].value);
                path.replaceWith(t.stringLiteral(result));

            }
        },
    });
    return generator(ast, { jsescOption: { minimal: true } }).code
}

// 多轮折叠字符串拼接: "a" + "b" → "ab"
function foldStrings(code) {
    const ast = parser.parse(code)
    for (let i = 0; i < 10; i++) {
        let pass = 0;
        traverse(ast, {
            BinaryExpression(path) {
                if (path.node.operator !== "+") return;
                const { left, right } = path.node;
                if (left.type === "StringLiteral" && right.type === "StringLiteral") {
                    path.replaceWith(t.stringLiteral(left.value + right.value));
                    pass++;
                }
            },
        });
        if (pass === 0) break;
    }
    return generator(ast, { jsescOption: { minimal: true } }).code
}



// ==================== main ====================
const inputFile = path.join(__dirname, "index.js");
const outputFile = path.join(__dirname, "index-decoded.js");

console.log("Reading:", inputFile);
let code = fs.readFileSync(inputFile, "utf-8");

console.log("Initializing decoder...");
code = initDecoder(code);
const parts = code.split("// @@@yuri@@@")
// 数组自旋
const sandbox1 = {};
vm.createContext(sandbox1);
vm.runInContext(parts[0], sandbox1);
var $dbsm_0x2328 = sandbox1.$dbsm_0x2328
console.log($dbsm_0x2328)
// 解第一层函数调用
const sandbox2 = { $dbsm_0x2328 };
vm.createContext(sandbox2);
vm.runInContext(parts[1], sandbox2)
var $dbsm_0x4f3f = sandbox2.$dbsm_0x4f3f
code = resolveDecoderCalls(code, $dbsm_0x4f3f)
// 解字符串拼接
code = foldStrings(code)
fs.writeFileSync(outputFile, code, "utf-8");
