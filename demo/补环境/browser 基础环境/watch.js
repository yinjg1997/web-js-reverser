function watch(object) {
    const handler = {
        get: function (target, property, receiver) {
            if (property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON') {
                console.log(
                  "对象:", object,
                  "方法:", "\x1B[32m[GET]\x1B[0m",
                  "属性名:", property,
                  "属性名类型:", typeof property,
                  "\x1B[33m属性值:\x1B[0m", target[property],
                  "属性值类型:", typeof target[property]
                )
            }
            return Reflect.get(...arguments)

        },
        set: function (target, property, value, receiver) {
               console.log(
                  "对象:", object,
                  "方法:", "\x1B[31m[SET]\x1B[0m",
                  "属性名:", property,
                  //"新属性值:", value,
                  "新属性值类型:", typeof value,
                  "旧属性值:", target[property],
                  "旧属性值类型:", typeof target[property],
               );
            return Reflect.set(...arguments);
        }
    }
    return new Proxy(object, handler)
}
