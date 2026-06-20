# 20260620
代理 Proxy 是会产生新对象的


一个function A(){}有 prototype 证明其是一个构造函数, 但是 A 是调用不了 prototype的, 只有A的实例才能访问prototype  

document.all 为不可检测对象, 不可检测对象的特征要伪装

| 检测类型 | 检测代码 | 对策 |
|---------|---------|------|
| **全局对象** | `typeof window === 'undefined'` | 定义 window 对象 |
| **process** | `'process' in window` | delete global.process |
| **Buffer** | `typeof Buffer !== 'undefined'` | delete global.Buffer |
| **toString** | `Object.prototype.toString.call(w)` | 设置 Symbol.toStringTag |
| **Function.toString** | `fn.toString()` 检查 `[native code]` | 使用 safeFunction |
| **属性描述符** | `Object.getOwnPropertyDescriptor` | 使用 defineProperty |
| **原型链** | `window instanceof Window` | setPrototypeOf |
| **webdriver** | `navigator.webdriver` | 设为 false |
| **plugins** | `navigator.plugins.length` | 提供 PluginArray |
# 京东那个补环境案例很完美

# 补环境应该跟着报错补, 不用跟着undefined 补

# 扣代码的理解
webpack 能扣下来使用是因为它把所有需要的依赖放进了一个自执行函数, 

自执行函数的执行"自给自足"不依赖外部环境, 因此可推任何自执行函数都是可扣的,

在逆向目标函数时, 若该目标相对独立(关联与嵌套较简单)的情况可以直接摘代码,

但是很多时候函数套函数, 这时候就要找一个闭包函数扣下来, 在其内部将目标函数提供给全局使用.

# 为什么补环境, 补环境目的是什么
扣下来的代码有调用浏览器环境的对象或函数时就需要补环境,

目的是让扣下来的代码正常运行, `通过报错去源码中寻找`或者`env代理`知道扣下来的代码正在使用哪些浏览器对象/函数, 然后通过`全局变量的形式`补充上使扣下来的代码正常运行

# 如何知道需要补哪些环境
把可能的环境对象进行一个Proxy代理, 后面的`env代理代码`使用相关环境变量时会打印在log中, 然后在浏览器中用根据对象熟悉在控制台中打印复制

这个不是万能的, 一些环境不太好补充,可以根据报错去源码中寻找, 确定到底调用了什么东西.

在proxy上加断点代码，追栈可以得到谁在调用环境对象，然后在source上给相同的目标打打断点，来对照环境补的对不对。
或者直接将代码和吐环境脚本放到Chrome的代码片段中执行，比在目标站点调试方便些，还能确认环境是否有特殊返回值