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

// 内联字典对象: _0x46739a / _0x48c7cb["key"] → 实际值
function inlineDictionary(code) {
    // 1. 从代码中提取字典定义
    const dictStart = code.indexOf('var _0x46739a = {};');
    if (dictStart === -1) {
        console.log("字典 _0x46739a 未找到，跳过内联");
        return code;
    }
    // 找到字典结束位置: var _0x48c7cb = _0x46739a;
    const dictEndMatch = code.indexOf('var _0x48c7cb = _0x46739a;', dictStart);
    if (dictEndMatch === -1) {
        console.log("字典别名 _0x48c7cb 未找到，跳过内联");
        return code;
    }
    const dictEnd = dictEndMatch + 'var _0x48c7cb = _0x46739a;'.length;
    const dictCode = code.substring(dictStart, dictEnd);

    // 2. 在 vm 沙箱中执行字典代码，拿到实际值
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(dictCode, sandbox);
    const dict = sandbox._0x48c7cb;

    const ast = parser.parse(code)
    traverse(ast, {
        AssignmentExpression(path) {
            const { left, right, operator } = path.node;
            if (
                operator === "=" &&
                right.type === "MemberExpression" &&
                right.object.type === "Identifier" &&
                right.object.name === "_0x48c7cb"
            ) {
                const result = dict[right.property.value];
                if (typeof result === "string") {
                    path.get('right').replaceWith(t.stringLiteral(result));
                } else if (typeof result === "function") {
                    path.get('right').replaceWith(t.functionexpression(result));
                }
            }
        },
    });
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
// 后面不需要解了, 搞不出来,
// 内联字典对象
// code = inlineDictionary(code)
// 字典内联后可能产生新的字符串拼接，再折叠一次
// code = foldStrings(code)
fs.writeFileSync(outputFile, code, "utf-8");
