const { watch } = require('./watch_func');

delete globalThis.navigator;


window = watch(globalThis, "window");

// 补 navigator
navigator = watch({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    platform: "MacIntel",
    language: "zh-CN",
    languages: ["zh-CN", "zh"],
    webdriver: false,
}, "navigator");

console.log("\n========== 1) 裸 navigator.userAgent ==========");
const ua1 = navigator.userAgent;
console.log("结果:", ua1);

console.log("\n========== 2) window.navigator.userAgent ==========");
const ua2 = window.navigator.userAgent;
console.log("结果:", ua2);

console.log("\n========== 3) 只读裸 navigator 本身 (不点属性) ==========");
const nav = navigator;
// !important globalThis.navigator 无法触发 watch
console.log("nav === globalThis.navigator:", nav === globalThis.navigator);
console.log("nav === window.navigator:", nav === window.navigator);

console.log("\n========== 4) 写 navigator 属性 ==========");
navigator.webdriver = true;
console.log("navigator.webdriver:", navigator.webdriver);

console.log("\n========== 5) globalThis.navigator.userAgent ==========");
const ua5 = globalThis.navigator.userAgent;
console.log("结果:", ua5);
