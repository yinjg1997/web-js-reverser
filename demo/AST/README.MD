## 不知道节点怎么写就在 AST Explorer 看一眼再写
| 节点                      | 干嘛的  |
| ----------------------- | ---- |
| Identifier              | 变量名  |
| CallExpression          | 函数调用 |
| MemberExpression        | a.b  |
| Literal / StringLiteral | 字面量  |
| ExpressionStatement     | 单行语句 |

## CallExpression 和 callee 是什么
首先，函数调用表达式 就是你代码里所有 xxx() 这样的写法，比如：
console.log(123)
fn()
obj.method()
arr.push(1)
而 callee 就是这个调用表达式里 “被调用的那个东西” —— 也就是括号 () 左边的部分。
```javascript
// 原始代码
const sourceCode = `
  console.log("hello");
  const num = 123;
  console.log(num);
  fn(); // 这行不会被改
`;

// 1. 解析成 AST
const ast = parse.parse(sourceCode, { sourceType: "script" });

// 2. 遍历 AST，处理 CallExpression
traverse(ast, {
  CallExpression(path) {
    const callee = path.node.callee; // 拿到调用的核心部分

    // 第一步：判断是不是 console.log 调用
    // callee 是 MemberExpression（成员表达式，比如 a.b）
    if (t.isMemberExpression(callee) && 
        t.isIdentifier(callee.object, { name: "console" }) && // 判断对象是 console
        t.isIdentifier(callee.property, { name: "log" })) {   // 判断属性是 log
      
      // 第二步：把 log 改成 error
      callee.property = t.identifier("error"); // 用 t 造一个新的标识符节点
    }
  }
});

const { code } = generate(ast, {
  jsescOption: {
    minimal: true, // 只转义必须转义的字符（比如引号、换行）
  },
});
console.log(code);
```