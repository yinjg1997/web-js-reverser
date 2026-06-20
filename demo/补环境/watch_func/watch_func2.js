/**
 * 监听对象属性读写。
 * 
 * @param {object} object 要代理的对象。
 * @param {string} name 对象名称。
 * @returns {Proxy} 返回代理对象。
 */
function watch(object, name) {
    const handler = {
        /**
         * 读取属性时触发。
         * @param {object} target 目标对象。
         * @param {string | symbol} property 属性名。
         * @param {unknown} receiver 代理接收者。
         * @returns {unknown}
         */
        get: function (target, property, receiver) {
            if (property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON') {
                console.log(
                    "对象:", name || object,
                    "\x1B[32m[GET] 属性:\x1B[0m",
                    property,
                    "属性名类型:", typeof property,
                    "\x1B[33m属性值:\x1B[0m", target[property],
                    "属性值类型:", typeof target[property]
                )
            }
            return Reflect.get(target, property, receiver)

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
                "对象:", name || object,
                "\x1B[31m[SET] 属性:\x1B[0m",
                property,
                //"新属性值:", value,
                "新属性值类型:", typeof value,
                "旧属性值:", target[property],
                "旧属性值类型:", typeof target[property],
            );
            return Reflect.set(target, property, value, receiver);
        }
    }
    // new Proxy 会返回一个代理对象, target 是要被代理的对象object, receiver 是代理对象
    return new Proxy(object, handler)
}