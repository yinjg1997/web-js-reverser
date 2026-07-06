```javascript
// 绝对错误写法
function Navigator() {
    this.prototype = watch(...)  // ← 实例的普通属性，叫 "prototype"
}

Navigator.prototype  // ← 函数对象自身的 prototype，完全不同的东西!
Navigator (函数)
  └── .prototype → {}  ← 用于 instanceof 和原型链

new Navigator() (实例)
  └── .prototype → Proxy  ← 只是个普通属性，名字碰巧叫 prototype
```