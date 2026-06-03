function env_proxy(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        // 模板字符串使用多行模板字面量，用 ${} 直接嵌入变量，避免冗余拼接
        const handler = `{
  get: function(target, property, receiver) {
    console.log(
      "对象:", "${proxyObjArr[i]}",
      "方法:", "\x1B[32m[GET]\x1B[0m",
      "属性名:", property,
      "属性名类型:", typeof property,
      "\x1B[33m属性值:\x1B[0m", target[property],
      "属性值类型:", typeof target[property]
    );
    return Reflect.get(...arguments);
  },
  set: function(target, property, value, receiver) {
    console.log(
      "对象:", "${proxyObjArr[i]}",
      "方法:", "\x1B[31m[SET]\x1B[0m",
      "属性名:", property,
      //"新属性值:", value,
      "新属性值类型:", typeof value,
      "旧属性值:", target[property],
      "旧属性值类型:", typeof target[property],
    );
    return Reflect.set(...arguments);
  }
}`;
        eval(`try {
            ${proxyObjArr[i]};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        } catch (e) {
            ${proxyObjArr[i]} = {};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        }`);
    }
}

function watch(object) {
    const handler = {
        get: function (target, property, receiver) {
            if (property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON') {
                console.log(
                    "对象:", object,
                    "方法:", "\x1B[32m[GET]\x1B[0m",
                    "属性名:", property,
                    "属性名类型:", typeof property,
                    "\x1B[33m属性值:\x1B[0m", target[property],
                    "属性值类型:", typeof target[property]
                )
            }
            return Reflect.get(...arguments)

        },
        set: function (target, property, value, receiver) {
            console.log(
                "对象:", object,
                "方法:", "\x1B[31m[SET]\x1B[0m",
                "属性名:", property,
                //"新属性值:", value,
                "新属性值类型:", typeof value,
                "旧属性值:", target[property],
                "旧属性值类型:", typeof target[property],
            );
            return Reflect.set(...arguments);
        }
    }
    // return object
    return new Proxy(object, handler)
}

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

delete global;
delete Buffer;
delete globalThis.navigator;
window = globalThis;
window.top = window.window = window.self = window

// 修改 window 数据描述符为 window
Object.defineProperties(window, {
    [Symbol.toStringTag]: {
        value: "window",
        configurable: true
    }
});

function Window() {}

Window.prototype = {
    constructor: Window,
    // 打个debugger，因为我们还不知道js有没有调用该方法，也许只是获取了一下，看有没有该方法呢
    DeviceMotionEvent: set_func_native(function deviceMotionEvent() {
        debugger
    }),
    DeviceOrientationEvent: set_func_native(function deviceOrientationEvent() {
        debugger
    }),
}


Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true
    }
})

set_func_native(Window);


Object.setPrototypeOf(window, Window.prototype)
// 赋值空对象最好使用这种class chrome{} 形式，而不是 {},因为这样我们可以看名字，并且最好挂上代理
window.chrome = class chrome {
}
window.setTimeout = set_func_native(function setTimeout(x, y) {})
window.setInterval = set_func_native(function setInterval(x, y) {})

console.log(window.toString())
console.log(Window.toString())