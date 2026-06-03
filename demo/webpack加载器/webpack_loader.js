window = global;


// 数组格式的加载器（见的少）
// 加载器, 加载器逻辑:构建一个对象,能够轻松调用所有的功能函数
!function (e) {
    // 缓存对象
    var t = {};
    // 加载器函数
    function n(r) {
        // 判断是否第一次调用
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i:r,
            l:!1,
            exports: {}
        };
        // 真正的功能调用
        e[r].call(o.exports, o, o.exports, n);
        return o.exports.exports;
    }

    // 加载器内部调用
    n(1)


}([
    function () {
        console.log("apple")
    },
    function () {
        console.log("banana")
    }
])