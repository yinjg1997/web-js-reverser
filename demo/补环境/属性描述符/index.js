// Object.getOwnPropertyDescriptor
// Object.getOwnPropertyDescriptors

function watch(object, name) {
    return new Proxy(object, {
        get: function (target, property, receiver) {
            console.log(
                name || object,
                "\x1B[32m[GET] 属性:\x1B[0m",
                property,
                "\x1B[33m属性值:\x1B[0m",
                target[property],
            );
            return Reflect.get(target, property, receiver);
        },
        set: function (target, property, value, receiver) {
            console.log(
                name || object,
                "\x1B[31m[SET] 属性:\x1B[0m",
                property,
                "新属性值:", value,
            );
            return Reflect.set(target, property, value);
        },
        has(target, property) {
            console.log(
                name || object,
                "\x1B[36m[HAS] 属性:\x1B[0m",
                property,
            )
            return Reflect.has(target, property)
        },
        getOwnPropertyDescriptor: (target, property) => {
            console.log(
                name || object,
                "\x1B[35m[属性描述符检测] 属性:\x1B[0m",
                property,
            );
            return Reflect.getOwnPropertyDescriptor(target, property);
        }
    })
}

// 测试代理对象
const testObj = watch({
    a: 1,
    b: 2,
    webdriver: false
}, "testObj");
Object.setPrototypeOf(testObj, {
    gggg: 3,
    hhhh: 44,
});

console.log("===== 1. Object.getOwnPropertyDescriptor 【只触发紫色描述符日志】 =====");
// 仅执行 getOwnPropertyDescriptor，无get/has，输出单独一行紫色
Object.getOwnPropertyDescriptor(testObj, "webdriver");
console.log("\n");

console.log("===== 1.1 Object.getOwnPropertyDescriptor 不存在的属性 【只触发紫色描述符日志】 =====");
Object.getOwnPropertyDescriptor(testObj, "un_exist_property");
console.log("\n");

console.log("===== 2. Reflect.getOwnPropertyDescriptor 【只触发紫色描述符日志】 =====");
Reflect.getOwnPropertyDescriptor(testObj, "a");
console.log("\n");

console.log("===== 3. Object.hasOwn 【只触发紫色描述符日志】 =====");
// 底层只调用 getOwnPropertyDescriptor，不会进 has 捕获器
Object.hasOwn(testObj, "b");
Object.hasOwn(testObj, "un_exist_property");
console.log("\n");

console.log("===== 4. Object.getOwnPropertyDescriptors 批量触发描述符检测 =====");
// 遍历所有自有属性，逐个调用 getOwnPropertyDescriptor
Object.getOwnPropertyDescriptors(testObj);
console.log("\n");

console.log("===== 5. 扩展运算符：先查描述符 + 再GET，两种日志都有 =====");
const copy = { ...testObj };
console.log("\n");

console.log("===== 6. Object.assign 复制对象：描述符检测 + GET 混合日志 =====");
const temp = {};
Object.assign(temp, testObj);
console.log("\n");

console.log("===== 7. for...in 循环：只会触发getOwnPropertyDescriptor 、不会触发 has =====");
for (const key in testObj) {
    key;
}
console.log("\n");

console.log("===== 8.1 Object.keys 触发 getOwnPropertyDescriptor =====");
Object.keys(testObj);
console.log("\n");

console.log("===== 8.2 Object.values / Object.entries：先触发 getOwnPropertyDescriptor 再get =====");
Object.values(testObj);
Object.entries(testObj);
console.log("\n");


console.log("===== 9. in 运算符：只触发 HAS，不触发描述符检测 =====");
"webdriver" in testObj;
console.log("\n");

console.log("===== 10. 直接读取属性 testObj.webdriver：只触发 GET =====");
testObj.webdriver;
