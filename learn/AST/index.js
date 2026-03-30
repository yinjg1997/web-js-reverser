const { writeFileSync } = require("fs");

const parse = require("@babel/parser"); // 字符串 → AST
const traverse = require("@babel/traverse").default; // 遍历 AST
const generator = require("@babel/generator").default; // AST → 字符串
const types = require("@babel/types"); // 造节点

/**
 *  不知道节点怎么写就在 AST Explorer 看一眼再写
 */
function isHookCall(node) {
  return (
    types.isCallExpression(node) &&
    types.isIdentifier(node.callee, { name: hookFunctionName })
  );
}

const jscode = `
({ a: 1, b: 2, c: () => {}, d: { x: 1 } })
`;

const ast = parse.parse(jscode);

// console.log(ast);

traverse(ast, {
  // CallExpression(path) {
  //   const callee = path.node.callee;

  //   // 判断是不是 console.log
  //   if (
  //     t.isMemberExpression(callee) &&
  //     t.isIdentifier(callee.object, { name: "console" }) &&
  //     t.isIdentifier(callee.property, { name: "log" })
  //   ) {
  //     // console.log → myLog
  //     callee.property = t.identifier("error");

  //     const args = path.node.arguments;
  //     args[0] = t.stringLiteral(`[日志前缀] ${args[0].value}`);
  //   }
  // },

  VariableDeclarator(path) {
    const { id, init } = path.node;
    console.log("path.node:::", path.node);

    if (!init) return;

    if (!types.isIdentifier(id)) return;

    if (
      types.isFunctionExpression(init) ||
      types.isArrowFunctionExpression(init)
    ) {
      return;
    }

    path.node.init = types.callExpression(types.identifier("yuri_hook"), [
      types.stringLiteral(id.name),
      init,
      types.stringLiteral("test"),
    ]);
  },

  /**
   * ========== 赋值表达式 ==========
   * 处理：
   *   a = 1
   *   obj.x = y
   */
  AssignmentExpression(path) {
    const { left, right } = path.node;

    if (
      types.isFunctionExpression(right) ||
      types.isArrowFunctionExpression(right)
    ) {
      return;
    }

    let name = generator(left).code;

    path.node.right = types.callExpression(types.identifier("yuri_hook"), [
      types.stringLiteral(name),
      right,
      types.stringLiteral("test"),
    ]);
  },
  /**
   * ({ a: 1, b: 2, c: () => {}, d: { x: 1 } })
   */
  ObjectExpression(path) {
    const { properties } = path.node;

    properties.forEach((prop) => {
      const { key, value } = prop;

      if (
        types.isFunctionExpression(value) ||
        types.isArrowFunctionExpression(value) ||
        types.isObjectExpression(value)
      ) {
        return;
      }

      prop.value = types.callExpression(types.identifier("yuri_hook"), [
        types.stringLiteral(key.name),
        value,
        types.stringLiteral("test"),
      ]);
    });
  },
});

const { code } = generator(ast, {
  jsescOption: {
    minimal: true, // 只转义必须转义的字符（比如引号、换行）
  },
});
console.log("code:::", code);
