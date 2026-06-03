// fixme 如何知道一个对象的原型链？
// 可以使用 Object.getPrototypeOf() 方法来获取一个对象的原型链。


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
/**
 * 常规的补环境写法 和  原型链写法, 以补 history 对象为例
 * 在浏览器里，history 不是一个 “孤立的普通对象”，而是遵循 JavaScript 原型链规则的内置对象：
 * history 的原型是 History.prototype（浏览器内置的原型对象）；
 * History.prototype 上挂载着 pushState、replaceState 等核心方法；
 *
 * 我们访问 window.history.pushState 时，实际是通过 原型链查找 找到 History.prototype.pushState 的；
 */

window = globalThis;
/**
 * 这个 history 是普通对象，"假的很", 原型是 Object.prototype，不是浏览器的 History.prototype；
 * 无法通过 history instanceof History 检测（会报错 History is not defined，或返回 false）；
 * 若目标代码遍历 history 的原型链（如 Object.getPrototypeOf(history)），会直接暴露是模拟环境。
 */
history = {
    length: 1,
    pushState: function (state, title, url) {
        console.log("pushState 被调用", state, title, url);
    },
};
window.history = history;

console.log(Object.getPrototypeOf(history))

console.log("===========================")

// fixme 1. History 构造函数, 浏览器中new会报错，因此我们此处也需要报错
var History = function History() {
    throw new TypeError("Illegal constructor");
}
// 保证 History.toString 结果和原生一样
set_func_native(History);
// 2 原型链
History.prototype = {
    // fixme 必须 模拟构造函数
    constructor: History,
    // fixme 模拟调用, 用 set_func_native 确保实例的函数 toString 结果和原生一样
    // fixme 注意: 后面的函数名 pushState 不能少, 虽然不规范,但是想要让 set_func_native 生效必须要加
    pushState: set_func_native(function pushState(state, title, url) {
        this.length += 1;
        console.log("pushState 被调用", state, title, url);
    }),
}
// 3 fixme configurable 只能通过 defineProperties 定义
Object.defineProperties(History.prototype, {
    [Symbol.toStringTag]: {
        value: "History",
        configurable: true
    }
});


// 4. 创建 history 实例, 浏览器中new会报错，因此我们此处也需要报错
window.history = class history {
    length = 1
}
Object.setPrototypeOf(history, History.prototype);
window.History = History; // 模拟浏览器 window

// todo 代理 window.history 和 History.prototype


console.log(Object.getPrototypeOf(history));
console.log(history.toString());
console.log(History.toString());
console.log(history.pushState.toString());
console.log(history.pushState({}, "", "/"));
console.log(history.length);

