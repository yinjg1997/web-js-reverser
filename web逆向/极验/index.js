const { writeFileSync, readFileSync } = require("fs");

const parser = require("@babel/parser"); // 字符串 → AST
const traverse = require("@babel/traverse").default; // 遍历 AST
const generator = require("@babel/generator").default; // AST → 字符串
const types = require("@babel/types"); // 造节点

const { decryptStr1, decryptStr2 } = require("./decrptStr.js");

const inpte_code = readFileSync("./gcaptcha4.js", { encoding: "utf-8" });

var ast = parser.parse(inpte_code);
let string_func_name = null;
traverse(ast, {
  FunctionDeclaration(path) {
    const name = path.node.id.name;
    const bodyStatements = path.node.body.body;
    if (bodyStatements.length === 0) {
      console.log(name, bodyStatements);
      string_func_name = name;
    }
  },
});

traverse(ast, {
  AssignmentExpression(path) {
    const { left, right } = path.node;
    if (
      left.type === "MemberExpression" &&
      left.object.type === "Identifier" &&
      left.object.name === string_func_name &&
      right.type === "CallExpression"
    ) {
      console.log(left.property.name);
    }
  },
});

// decryptStr1
traverse(ast, {
  VariableDeclaration(path) {
    const declarations = path.node.declarations;
    if (declarations.length === 3) {
      if (
        declarations[0].init &&
        declarations[0].init.object?.name === string_func_name
      ) {
        // console.log(path + "");
        const deStr1 = declarations[0].id.name;

        const bingding1 = path.scope.getBinding(deStr1);
        if (bingding1 && bingding1.constant) {
          bingding1.referencePaths.forEach((refPath) => {
            // console.log(refPath + "");
            const refParentPath = refPath.parentPath;
            if (
              types.isCallExpression(refParentPath.node) &&
              refParentPath.node.arguments.length === 1 &&
              types.isNumericLiteral(refParentPath.node.arguments[0])
            ) {
              // console.log(refParentPath + "");
              const result = decryptStr1(refParentPath.node.arguments[0].value);
              // console.log(refParentPath + " ==> " + result);
              refParentPath.replaceWith(types.stringLiteral(result));
            }
          });
        }
        const deStr2 = declarations[2].id.name;
        const bingding2 = path.scope.getBinding(deStr2);
        // bingding2.constant 标记该变量是否为常量、不会被重新赋值
        if (bingding2 && bingding2.constant) {
          bingding2.referencePaths.forEach((refPath) => {
            // console.log(refPath + "");
            const refParentPath = refPath.parentPath;
            if (
              types.isCallExpression(refParentPath.node) &&
              refParentPath.node.arguments.length === 1 &&
              types.isNumericLiteral(refParentPath.node.arguments[0])
            ) {
              // console.log(refParentPath + "");
              const result = decryptStr1(refParentPath.node.arguments[0].value);
              // console.log(refParentPath + " ==> " + result);
              refParentPath.replaceWith(types.stringLiteral(result));
            }
          });
        }
      }
    }
  },
});

// decryptStr2
traverse(ast, {
  VariableDeclaration(path) {
    const { declarations } = path.node;
    if (declarations.length === 1) {
      const declaration = declarations[0];
      const var_name = declaration.id.name;
      const init = declaration.init;

      if (
        types.isMemberExpression(init) &&
        types.isMemberExpression(init.object) &&
        types.isCallExpression(init.object.object) &&
        types.isIdentifier(init.object.object.callee.object) &&
        init.object.object.callee.object.name === string_func_name &&
        init.object.object.callee.property.name === "$_Dx"
      ) {
        // console.log(path.get('declarations.0') + "");
        const bingding = path.scope.getBinding(var_name);
        if (bingding && bingding.constant) {
          bingding.referencePaths.forEach((refPath) => {
            console.log(refPath + "");
            refPath.replaceWith(init);
          });
        }
      }
    }
  },
  // MemberExpression(path) {
  //     if (types.isCallExpression(path.node.object.object)
  //         && types.isIdentifier(path.node.object.object.callee.object)
  //         && path.node.object.object.callee.object.name === string_func_name
  //         && path.node.object.object.callee.property.name === "$_Dx"
  //     ) {
  //         console.log(path + "")
  //     }
  //
  // }
});

const out_code = generator(ast, {
  compact: false,
  jsescOption: { minimal: true },
}).code;
writeFileSync("./gcaptcha4_decode.js", out_code, { encoding: "utf-8" });
