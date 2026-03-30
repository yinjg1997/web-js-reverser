let setProxyArr = function (proxyObjArr) {
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

setProxyArr(['window', 'document', 'location', 'navigator', 'history', 'screen']);
