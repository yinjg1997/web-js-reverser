# 若请求和返回值都被加密
应该先逆向解密返回值, 再逆向加密请求参数; 一般这样容易验证

# 直接把所有代码拿下来保存
这样方便后续检索

# 如何确认是否为常规加密
在控制台中拿参数和返回值, 然后在拿参数去爬虫工具库中进行加密, 对比下结果是否一样

# 监控 window 对象很重要
在执行关键加密函数后, window 对象中一般会有一些生成的加密函数或相关变量,

# 确认加密是在拦截器中做的后, 可以选择追拦截器中的每一个函数
```javascript
            f.prototype.request = function(t) {
                "string" == typeof t ? (t = arguments[1] || {}).url = arguments[0] : t = t || {},
                (t = a(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                var e = t.transitional;
                void 0 !== e && s.assertOptions(e, {
                    silentJSONParsing: u.transitional(u.boolean, "1.0.0"),
                    forcedJSONParsing: u.transitional(u.boolean, "1.0.0"),
                    clarifyTimeoutError: u.transitional(u.boolean, "1.0.0")
                }, !1);
                var n = []
                  , r = !0;
                // fixme 这里的 e 都是函数, 可以选择追每一个 e.fulfilled, 看看里面是否有加密逻辑
                this.interceptors.request.forEach(function(e) {
                    "function" == typeof e.runWhen && !1 === e.runWhen(t) || (r = r && e.synchronous,
                    n.unshift(e.fulfilled, e.rejected))
                });
                var o, f = [];
                if (this.interceptors.response.forEach(function(t) {
                    f.push(t.fulfilled, t.rejected)
                }),
                !r) {
                    var l = [i, void 0];
                    for (Array.prototype.unshift.apply(l, n),
                    l = l.concat(f),
                    o = Promise.resolve(t); l.length; )
                        o = o.then(l.shift(), l.shift());
                    return o
                }
                for (var c = t; n.length; ) {
                    var p = n.shift()
                      , d = n.shift();
                    try {
                        c = p(c)
                    } catch (t) {
                        d(t);
                        break
                    }
                }
                try {
                    o = i(c)
                } catch (t) {
                    return Promise.reject(t)
                }
                for (; f.length; )
                    o = o.then(f.shift(), f.shift());
                return o
            }
```

# 找到关键参数或找到包含关键参数的对象变量时应该搜索一下这个变量,看看是怎么来的
# hook 是定位的王道!
hook 对象, hook 对象属性, hook 函数,
- 定位 this.attr 位置方法
- 定位 window.xxx
# 补环境是定位的第二道工序


# 调试
调试需要在一个新浏览器中进行, 没有干扰(插件加载的干扰)

# 打断点
打断点追栈时,异步是一个分割线, 在栈中异步之前的数据会失真, 要在异步那里重新打断点

# 其他
Python 调用 execjs 时会出现编码问题， 需要显式地为 subprocess.Popen 设置编码为 UTF-8
```python
import subprocess
from functools import partial
# 修改 subprocess.Popen，设置默认编码为 UTF-8
subprocess.Popen = partial(subprocess.Popen, encoding="UTF-8")
import execjs
```

爬虫基础：https://www.yuque.com/tuling_python/spider_base/zgiygrmqhm0f4hoa
密码：qnb0

爬虫逆向：https://www.yuque.com/buziran/cbopse
密码：ghzd

安卓逆向：https://www.yuque.com/buziran/ixn222?
密码oiu0