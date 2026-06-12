class NativeFuncDisguiser {
    constructor() {
        this.map = new Map()
        this._toString = Function.prototype.toString
        this._install()
    }

    _install() {
        const self = this
        Function.prototype.toString = function () {
            // this 指向 「正在调用 .toString() 的那个函数本身, toString 是挂在 Function.prototype 上的方法。当你调用 某函数.toString() 时，JS 会自动把 某函数 作为 this 传进去。
            if (self.map.has(this)) {
                const name = self.map.get(this)
                return `function ${name || this.name}() { [native code] }`
            }
            return self._toString.call(this)
        }
        // ↓ 关键：把 toString 自己也伪装成原生
        this.map.set(Function.prototype.toString, 'toString')
    }

    set(func, name = '') {
        this.map.set(func, name)
    }

    isNative(fn) {
        return /\[native code\]/.test(Function.prototype.toString.call(fn))
    }
}


function test() {
    // ===== 用例 =====
    const disguiser = new NativeFuncDisguiser()

    // 用例 1：具名函数自动用本身 name
    function fetch(url) {
        return url
    }

    disguiser.set(fetch)
    console.log(fetch.toString.toString.toString())
    // 期望: function fetch() { [native code] }

    // ===== 用例 3：箭头函数和这种函数式声明(function () {}) 必须显式传 name（否则 name 为空）=====
    const fakeEval = () => 'fake'
    disguiser.set(fakeEval, 'eval')
    console.log(fakeEval.toString())
    // 期望: function eval() { [native code] }


    // 用例 6：isNative 工具方法
    console.log(disguiser.isNative(fetch))       // 期望: true
}