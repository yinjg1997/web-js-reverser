// ==UserScript==
// @name         JS Hook
// @namespace    http://tampermonkey.net/
// @version      2025-11-10
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

/**
 * // @downloadURL https://update.greasyfork.org/scripts/14106/%5B%20jshookjs%20%5D.user.js
 * 通用模块加载器函数，用于支持不同的模块系统。
 *
 * 用于加载 methodInterceptor 函数,
 *
 * @param {string} name - 模块名称。
 * @param {function} factory - 返回模块内容的工厂函数。
 *
 * 1. AMD (Asynchronous Module Definition):
 *    - 检查是否存在 AMD 环境（例如 RequireJS）。
 *    - 如果是 AMD 环境，使用 `define` 方法定义模块。
 *
 * 2. CommonJS:
 *    - 检查是否存在 CommonJS 环境（例如 Node.js）。
 *    - 如果是 CommonJS 环境，使用 `module.exports` 导出模块。
 *
 * 3. 全局变量:
 *    - 将模块挂载到全局对象上（在浏览器中通常是 `window`）。
 */
function universalModuleLoader(name, factory) {
    if (typeof define === "function" && define.amd) {
        define(name, factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
        console.log("methodInterceptor loaded on module.exports");
    } else if (typeof window === "object") {
        window[name] = factory();
        console.log("methodInterceptor loaded on window");

    }
}

function methodHook() {
    /*
     * 入口方法
     *
     * 用法示例：
     * hook(alert) // 钩住默认全局方法
     * hook(window, 'alert') // 钩住指定对象的方法
     * hook('window.tool.calc') // [推荐]使用字符串路径访问方法
     */


    const root = typeof window !== 'undefined' ? window : global
    // eval 被设置为 root.eval，即保存全局对象上的原始 eval 函数。
    // 这样做是为了在代码中使用 eval 时，确保调用的是全局环境中的 eval，而不是被其他代码覆盖或修改的版本。
    const eval = root.eval;

    /**
     * 模拟 Function.bind
     * @param fn
     * @param scope
     * @returns {function(): *}
     */
    // const bind = function (fn, scope) {
    //     return function () {
    //         return fn.apply(scope, arguments);
    //     }
    // }

    /**
     * 直接修改参数或返回结果
     * @param args
     * @returns {function(): *}
     * @private
     */
    const __getFun__ = function (args) {
        'use strict';
        return function () {
            return args;
        };
    };

    function Hook() {
        'use strict';
        console.log("inner Hook this: ", this);
        if (this instanceof Hook) return this;

        // 定义变量存储方法信息
        let fn_real,       // 原始方法
            fn_name,       // 方法名
            fn_object,     // 方法所在对象
            fn_object_name; // 对象名称

        // 将 arguments 转换为数组，以便更灵活地处理参数
        let args = Array.prototype.slice.call(arguments),
            arg = args.pop(); // 从参数数组中获取最后一个参数，通常是方法名或路径

        // 获取倒数第二个参数作为方法所在的对象，如果没有提供则默认为全局对象
        fn_object = args.pop() || root;

        // 尝试从 arg 中获取方法名
        fn_name = arg.name;

        // 检查 arg 是否是字符串类型（表示方法的路径）
        if (typeof arg === "string") {
            // 将字符串按 '.' 分割，获取路径中的各个部分
            arg = arg.split(".");
            // 从路径中获取方法名
            fn_name = arg.pop();
            // 获取对象路径（不包括方法名）
            fn_object_name = arg.join(".");
            // 使用 eval 解析对象路径，获取对象引用
            fn_object = eval(fn_object_name || fn_object);
        }
        fn_real = fn_object[fn_name];

        // 检查方法是否存在
        if (!(fn_object && fn_name && fn_real)) {
            console.error(arguments);
            throw new Error('hook fail');
        }

        // 存储钩子信息
        let storage;
        if (fn_object_name) {
            storage = Hook.prototype.storage[fn_object_name] =
                Hook.prototype.storage[fn_object_name] || {};
        } else {
            fn_object.__hook__ || Object.defineProperties && Object.defineProperties(fn_object, {
                '__hook__': {
                    value: {},
                    enumerable: false,
                    configurable: true
                }
            });
            storage = fn_object.__hook__;
        }

        // 如果已经存在钩子，返回现有的
        if (storage[fn_name]) {
            return storage[fn_name].exports;
        }

        const h = new Hook();
        // 存储方法信息
        h.fn_real = fn_real;
        h.fn_name = fn_name;
        h.fn_object = fn_object;
        h.fn_object_name = fn_object_name;
        // 初始化伪造参数和结果函数
        h.fake_arg_fn = null;
        h.fake_rst_fn = null;
        // 对外暴露的接口
        h.exports = {
            // 如果 fake 和 fakeArg 方法需要访问 Hook 实例的属性（如 fn_real、fn_name 等），那么使用 bind 是必要的。
            fake: h.fake.bind(h),
            fn_puppet: h.fn_puppet,
            fakeArg: h.fakeArg.bind(h),
            fakeArgFn: h.fakeArgFn.bind(h),
            fakeRst: h.fakeRst.bind(h),
            fakeRstFn: h.fakeRstFn.bind(h),
            off: h.off.bind(h),
            offArg: h.offArg.bind(h),
            offRst: h.offRst.bind(h),
            data: {
                fn_real: fn_real,
                fn_name: fn_name,
                fn_object_name: fn_object_name,
                fn_object: fn_object,
                fakeArgFn: h.fake_arg_fn,
                fakeRstFn: h.fake_rst_fn
            }
        };

        // 保存当前钩子
        storage[fn_name] = h;

        // 支持链式调用
        return h.exports;
    }

    Hook.prototype.storage = {};

    /*
     * 替换原始方法
     *
     *
     * 关键分支：flag为true时，传 arguments 和 data 两个参数
     * flag=true 的规则，把 arguments（参数列表）和 data（元信息）作为两个参数，传给你的回调函数
     * 传 false 的话，你没法直接用 data.fn_real 了 —— 但不是不能调用原始方法，只是获取原始方法的方式变了，
     * 而且会丢了 data 里的所有元信息。
     */
    Hook.prototype.fake = function (fakeFn, flag) {
        const data = this.exports.data;
        const puppet = eval("(function " + this.fn_real.name +
            "() {" +
            "data.scope = this;" +
            (flag === false ?
                    "return fakeFn.apply(this, arguments)" :
                    "return fakeFn.call(this, arguments, data)"
            ) +
            "})");
        for (let prop in this.fn_real) {
            if (this.fn_real.hasOwnProperty(prop)) {
                puppet[prop] = this.fn_real[prop];
            }
        }
        puppet.toLocaleString = puppet.toString = function () {
            return 'function () { [native code] }';
        };

        this.fn_puppet = puppet;
        this.exports.fn_puppet = puppet;
        this.fn_object[this.fn_name] = puppet;

        return this.exports;
    };

    /*
     * 在原方法前，劫持传入的参数
     *
     * fakeArg('直接替换为要传入的参数', '2', 3...)
     */
    Hook.prototype.fakeArg = function () {
        'use strict';
        this.__fakeArgRst__();
        this.fake_arg_fn = this.exports.data.fakeArgFn = __getFun__(arguments);
        return this.exports;
    };

    /*
     * fakeArgFn(function(原参数1, 2, 3...){
     *     return [修改后的参数1,2,3]
     *     // 无返回(undefinded)则使用原始参数
     *     // 清空传入参数可以返回一个空数组 return []
     * })
     */
    Hook.prototype.fakeArgFn = function (fn) {
        'use strict';
        this.__fakeArgRst__();
        this.fake_arg_fn = this.exports.data.fakeArgFn = fn;
        return this.exports;
    };

    /*
     * 在原方法后，劫持返回的数据
     *
     * fakeRst('直接替换为要返回的结果')
     */
    Hook.prototype.fakeRst = function (arg) {
        'use strict';
        this.__fakeArgRst__();
        this.fake_rst_fn = this.exports.data.fakeRstFn = __getFun__(arg);
        return this.exports;
    };

    /*
     * fakeRstFn(function(原返回值){
     *     return 修改后的返回值
     *     // 无返回(undefinded)则使用原始参数
     * })
     */
    Hook.prototype.fakeRstFn = function (fn) {
        'use strict';
        this.__fakeArgRst__();
        this.fake_rst_fn = this.exports.data.fakeRstFn = fn;
        return this.exports;
    };

    /*
     * 开启劫持参数和返回值
     */
    Hook.prototype.__fakeArgRst__ = function () {
        'use strict';
        if (typeof this.fn_puppet === 'function') return;
        // var t = this;
        const fakeArgRstFn = function (args, data) {
            let faked_arg = data.fakeArgFn ? data.fakeArgFn.apply(this, args) || args : args;
            faked_arg = faked_arg === undefined ? args : faked_arg;
            typeof faked_arg !== 'string' && Array.prototype.slice.call(faked_arg).length === 0 && (faked_arg = [faked_arg]);
            const real_rst = data.fn_real.apply(this, faked_arg);
            let faked_rst = data.fakeRstFn ? data.fakeRstFn.call(this, real_rst) : real_rst;
            faked_rst = faked_rst === undefined ? real_rst : faked_rst;
            return faked_rst;
        };
        this.fake(fakeArgRstFn, true);
    };

    /*
     * 关闭劫持
     *
     * 传入参数为空：关闭所有劫持   hook(alert).off()
     * 传入字符串 "arg" 或 "rst"：关闭对应劫持   hook(alert).off('arg')
     * 传入方法：关闭对应劫持
     *
     * 前后劫持全部关闭后，还原被 hook 的方法
     */
    Hook.prototype.off = function (filter) {
        'use strict';
        (!filter || filter === 'arg') && (this.fake_arg_fn = this.exports.data.fakeArgFn = null);
        (!filter || filter === 'rst') && (this.fake_rst_fn = this.exports.data.fakeRstFn = null);

        if (!this.fake_arg_fn && !this.fake_rst_fn) {
            this.fn_object[this.fn_name] = this.fn_real;
            this.fn_puppet = undefined;
        }

        return this.exports;
    };

    /*
     * 关闭参数劫持
     */
    Hook.prototype.offArg = function (filter) {
        'use strict';
        filter = filter || 'arg';
        this.off(filter);
        return this.exports;
    };

    /*
     * 关闭返回值劫持
     */
    Hook.prototype.offRst = function (filter) {
        'use strict';
        filter || 'rst';
        this.off(filter);
        return this.exports;
    };

    return Hook;
}


// 示例调用
// universalModuleLoader("hook", () => console.log("hook loaded!"));
universalModuleLoader("hook", methodHook);


// 效果测试

console.log('✅ JSON.stringify Hook 已启动');

// JSON.stringify
function json_stringify_hook() {
    hook('JSON.stringify').fake(function (argumentsList, hookMeta) {
        // 3. 调用原始 JSON.stringify 并返回结果
        const result = hookMeta.fn_real.apply(this, argumentsList);

        const [value, replacer, space] = argumentsList;
        // fixme 劫持指定参数的逻辑
        // if (value["sdkVersion"]) {
        // }

        // 1. 打印劫持到的参数
        console.log('\n📌 Hook 捕获 JSON.stringify 调用：');
        console.log('   原始值:', value);
        console.log('   替换器:', replacer);
        console.log('   缩进:', space);

        // 2. 添加调试断点（可以注释掉）
        // debugger;
        // 4. 打印返回结果
        console.log('   序列化结果:', result);


        return result;
    }, true);
}

// JSON.parse Hook
function json_parse_hook() {
    hook('JSON.parse').fake(function (argumentsList, hookMeta) {
        // 3. 调用原始 JSON.parse 并返回结果
        const result = hookMeta.fn_real.apply(this, argumentsList);
        const [text, reviver] = argumentsList;

        // 1. 打印劫持到的参数
        console.log('\n📌 Hook 捕获 JSON.parse 调用：');
        console.log('   待解析字符串:', text);
        console.log('   还原函数:', reviver);

        // 2. 添加调试断点（可以注释掉）
        // debugger;

        // 4. 打印返回结果（可选）
        console.log('   解析结果:', result);


        return result;
    }, true);
}