
function sign() {
    let code = "123"
    eval(`code = code + "-456"`)
    return code
}

console.log(sign());

// fixme 在执行时等价于下面, 因此有些站在一个函数使用 eval 两次来动态生成代码, 只扣其中一部分是运行不了的
function sign2() {
    let code = "123"
    code = code + "-456"
    return code
}