window = globalThis;
(function () {
    var _Function = window.Function
    /**
     * class 没有 arguments 和 caller 属性
     * 箭头函数 没有 arguments 和 caller 属性
     * function 有 arguments 和 caller 属性
     */
    window.Function = (code) => {
        if (code.includes("debugger")) {
            code = code.replaceAll("debugger", "")
        }
        return _Function.apply(window, code )
    }
    _Function.prototype.constructor = Function
    Object.defineProperty(Function, "prototype", {
        value: _Function.prototype,
        writable: false,
        enumerable: false,
        configurable: true,
    })

    Object.defineProperty(Function, "length", {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true,
    })

    Object.defineProperty(Function, "name", {
        value: "Function",
        writable: false,
        enumerable: false,
        configurable: true,
    })
})()

