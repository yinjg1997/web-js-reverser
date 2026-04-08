const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");

// 解16进制混淆
function initDecoder(code) {
    const ast = parser.parse(code)

    traverse(ast, {
        StringLiteral(path) {
            path.replaceWith(t.stringLiteral(path.node.value))
            path.skip() // 跳过新节点，防止再次进入这个 visitor 死循环
        }
    })

    return generator(ast, {jsescOption: {minimal: true}}).code
}



// ==================== main ====================
const inputFile = path.join(__dirname, "index.js");
const outputFile = path.join(__dirname, "index-decoded.js");

console.log("Reading:", inputFile);
let code = fs.readFileSync(inputFile, "utf-8");

console.log("Initializing decoder...");
code = initDecoder(code);
fs.writeFileSync(outputFile, code, "utf-8");
