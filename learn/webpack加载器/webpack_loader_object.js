// webapck案例流程
// 1.找加载器对应的文件
// 2.注释初始化动作吗,少补环境
// 3.全局调用加载器函数
// 4.打上执行模块日志

// fixme 补环境方便， 将node 的global 赋值给window
window = global;
// fixme 在自执行函数外部调用 加载器函数
var yinjg = {};
// 加载器, 加载器逻辑:构建一个对象,能够轻松调用所有的功能函数
!(function (e) {
  // 缓存对象
  var t = {};

  // 加载器函数
  function n(r) {
    // 判断是否第一次调用
    if (t[r]) return t[r].exports;
    var o = (t[r] = {
      i: r,
      l: !1,
      exports: {},
    });
    // fixme 打印执行模块日志， 需要知道调哪些函数
    console.log(`r::: ${r}`);
    // 真正的功能调用
    e[r].call(o.exports, o, o.exports, n); // 第一个参数：指定模块函数执行时的 this 指向
    return o.exports.exports;
  }
  // fixme 在自执行函数外部调用 加载器函数
  yinjg.n = n;

  // fixme 选择性注释掉初始化函数， 一些初始化函数会检测环境和解密逻辑无关
  // n(1003)
})({
  1001: function (t, e, r) {
    /**
        * function (t, e, r)：这是 Webpack 模块的标准包装函数，参数对应：
        t (module)：当前模块对象（包含 exports 等属性）。
        e (exports)：模块的导出对象（用于向外暴露内容）。
        r (require)：Webpack 内部的模块加载函数（用来加载依赖模块，比如 r("8oxB") 就是加载 ID 为 8oxB 的模块）。
    */
    console.log("apple");
    this.exports = 100;
  },
  1002: function (t, e, r) {
    console.log("banana");
    this.exports = 200;
  },
  1003: function (t, e, r) {
    console.log("初始化函数");
    this.exports = 333;
  },
});

yinjg.n(1001);
