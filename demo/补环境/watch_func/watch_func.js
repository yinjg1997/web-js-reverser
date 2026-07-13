/**
 * 监听对象属性读写。
 *
 * Proxy 不是复制对象，而是创建一个代理对象；它只拦截你通过这个代理对象进行的操作。
 *
 * 特殊的: Symbol(nodejs.util.inspect.custom) 是 Node.js 内部触发的(可以通过watch打断点跟栈确定)，不是目标js中调用了。Node.js 在 console.log 打印对象时，会先检测对象有没有自定义的 inspect 方法,
 * @param {object} object 要代理的对象。
 * @param {string} name 对象名称。
 * @returns {Proxy} 返回代理对象。
 */
function watch(object, name) {
  // new Proxy 会返回一个代理对象, target 是要被代理的对象object, receiver 是代理对象
  return new Proxy(object, {
    /**
     * 读取属性时触发。
     * @param {object} target 目标对象。
     * @param {string | symbol} property 属性名。
     * @param {unknown} receiver 代理接收者。
     * @returns {unknown}
     */
    get: function (target, property, receiver) {
      // if (property === "childElementCount") {
      //     debugger;
      // }
      console.log(
        name || object,
        "\x1B[32m[GET] 属性:\x1B[0m",
        property,
        "\x1B[33m属性值:\x1B[0m",
        target[property],
      );

      return Reflect.get(target, property);
    },
    /**
     * 写入属性时触发。
     * @param {object} target 目标对象。
     * @param {string | symbol} property 属性名。
     * @param {unknown} value 新值。
     * @param {unknown} receiver 代理接收者。
     * @returns {boolean}
     */
    set: function (target, property, value, receiver) {
      console.log(
        name || object,
        "\x1B[31m[SET] 属性:\x1B[0m",
        property,
        "新属性值:",
        value,
      );
      return Reflect.set(target, property, value);
    },

    /**
     * 检测属性是否存在
     * @param {object} target
     * @param {string} property
     * @returns
     */
    has(target, property) {
      console.log(name || object, "\x1B[36m[HAS] 属性:\x1B[0m", property);
      return Reflect.has(target, property);
    },

    /**
     * 下列各调用表现特征详见 属性描述符文件夹
     * Object.getOwnPropertyDescriptor(proxy, 'foo')
     * Object.getOwnPropertyDescriptors(proxy)
     * ! Object.keys / Object.values / Object.entries
     * for...in 循环
     * Object.assign
     * 扩展运算符
     *
     * @param {object} target
     * @param {string} property
     * @returns
     */
    getOwnPropertyDescriptor: (target, property) => {
      console.log(
        name || object,
        "\x1B[35m[属性描述符检测] 属性:\x1B[0m",
        property,
      );
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
  });
}
