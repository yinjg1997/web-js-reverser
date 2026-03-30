function set_func_native(func) {
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
 * 通用封装：创建模拟浏览器对象（如 navigator、location 等）
 * @param {string} constructorName - 构造函数名称（如 "Navigator"、"Location"）
 * @param {Object} prototypeProps - 原型上的属性集合（模拟的核心属性）
 * @param parentConstructorName
 */
function createMockBrowserObject(constructorName, prototypeProps = {}, parentConstructorName) {
    // 1. 创建空构造函数
    const Constructor = new Function(`
        return function ${constructorName}() {
            // 修正：判断父构造函数是否存在于window，函数表达式加括号包裹
            if (${parentConstructorName ? `window['${parentConstructorName}']` : 'false'}) {
                window['${parentConstructorName}'].call(this);
            }
        }
    `)();
    Constructor.name = constructorName;

    set_func_native(Constructor);

    // 实现原型链继承（让子类原型的原型指向父类原型）
    const ParentConstructor = parentConstructorName ? window[parentConstructorName] : null;
    if (ParentConstructor) {
        // 用 Object.create 创建父类原型的实例作为子类原型
        Constructor.prototype = Object.create(ParentConstructor.prototype, {
            // 修复 constructor 指向（否则会指向 ParentConstructor）
            constructor: {
                value: Constructor,
                enumerable: false,
                configurable: true,
                writable: true
            }
        });
    } else {
        // 无父类时，直接创建原型对象
        Constructor.prototype = {
            constructor: Constructor
        };
    }

    // 3. 合并自定义原型属性（不覆盖已有原型链）
    Object.assign(Constructor.prototype, prototypeProps);

    // 4. 添加 Symbol.toStringTag（确保 Object.prototype.toString 行为一致）
    Object.defineProperties(Constructor.prototype, {
        [Symbol.toStringTag]: {
            value: constructorName,
            configurable: true,
        },
    });

    // 5. 创建实例并挂载到全局
    const instance = new Constructor();

    // 7. 将构造函数挂载到 window
    window[constructorName] = Constructor;

    // 返回构造函数和实例（方便后续扩展）
    return {Constructor, instance};
}

window = globalThis;
window.top = window.self = window.window = window

createMockBrowserObject("Screen", {
    width: 1920,
    height: 1080,
    availWidth: 1440,
    availHeight: 900,
    colorDepth: 24,
    pixelDepth: 24,
})

createMockBrowserObject("TEST", {
    pathname: "/",
    search: "",
    hash: "",
}, "Screen")

window.testInstance = new TEST();
console.log(window.testInstance)
console.log(window.testInstance.width)
console.log(window.testInstance.pathname)
// 1. 获取 TEST 原型的原型（即父类原型）
const testProto = Object.getPrototypeOf(TEST.prototype);
console.log("TEST.prototype 的原型 === Screen.prototype:", testProto === Screen.prototype); // true（继承成功）

// 2. 逐层验证完整原型链
console.log(
    "testInstance -> TEST.prototype -> Screen.prototype:",
    Object.getPrototypeOf(testInstance) === TEST.prototype, // true
    Object.getPrototypeOf(TEST.prototype) === Screen.prototype, // true
    Object.getPrototypeOf(Screen.prototype) === Object.prototype // true（最终继承自 Object）
);




