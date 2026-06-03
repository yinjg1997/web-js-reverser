/**
 * fixme 用于模拟浏览器原生函数的toString()，防止被检测到;
 * 浏览器原生函数的toString()会返回"function 函数名() { [native code] }"，
 * 而node环境下的toString()会返回"function 函数名() { 源代码 }"
 */
const set_func_native = function (func) {
    //处理安全函数
    Function.prototype.$call = Function.prototype.call;
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')'));

    const myToString = function myToString() {
        return typeof this === 'function' && this[myFunction_toString_symbol] || $toString.$call(this);
    }

    const set_native = function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        });
    }

    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", myToString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");

    const safe_Function = function safe_Function(func) {
        set_native(func, myFunction_toString_symbol, "function" + (func.name ? " " + func.name : "") + "() { [native code] }");
        return func
    }

    return safe_Function(func)
}


// 1. 先模拟浏览器的 History 构造函数
function History() {
  this.length = 1; // 实例属性：历史记录长度
}

// 2. 给 History 的原型（History.prototype）挂载核心方法（和真实浏览器一致）
// fixme 注意: 后面的函数名不能少, 虽然不规范,但是想要让 set_func_native 生效必须要加
History.prototype.pushState = function pushState(state, title, url) {
  this.length += 1;
  console.log("pushState 被调用", state, title, url);
};

history = new History();


// fixme 调用 toString() 会返回源码，导致被检测到
console.log(History.toString());
console.log(history.pushState.toString());
console.log("======================")
// fixme 调用 safeFunction 后，toString() 会返回"function pushState() { [native code] }"
set_func_native(History)
set_func_native(History.prototype.pushState)
console.log(History.toString());
console.log(history.pushState.toString());
