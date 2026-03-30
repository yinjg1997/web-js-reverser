function setProxyArr(proxyObjArr) {
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

window = {
  Date: Date,
  parseInt: parseInt,
  Math: Math,
  localStorage: {
    getItem: function (key) {
      console.log("getItem:::", key);
      return this[key];
    },

    setItem: function (key, value) {
      console.log("setItem:::", key, value);
      this[key] = value;
    },
  },
  chrome: {},
  screen: { availWidth: 1920, availHeight: 1055, width: 1920, height: 1080 },
  document: {
    cookie: "",
    // referrer: "https://mms.pinduoduo.com/",
    referrer: "https://yingxiao.pinduoduo.com/",
    addEventListener: function addEventListener(a, b) {
      return undefined;
    },
    documentElement: {},
    body: {},
    visibilityState: "visible",
  },
  navigator: {
    webdriver: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    plugins: { 0: {} },
    languages: ["zh-CN", "zh"],
  },
  history: {
    back: function back() {
      console.log("back", arguments);
    },
  },
  location: {
    // href: "https://mms.pinduoduo.com/",
    href: "https://yingxiao.pinduoduo.com/",
    port: "",
  },
};

Element = {
  prototype: {
    attachShadow: function () {
      console.log("attachShadow:::", ...arguments);
    },
  },
};

const proxy_array = [
  "window",
  "document",
  "location",
  "navigator",
  "history",
  "localStorage",
  "HTMLElement",
  "Element",
];
// setProxyArr(proxy_array);

// window = globalThis;
// window.top = window.window = window.self = window;

// window.outerHeight = 855;
// window.chrome = {};
// window.DeviceOrientationEvent = function () {
//   console.log("DeviceOrientationEvent:::", ...arguments);
// };
// window.DeviceMotionEvent = function () {
//   console.log("DeviceMotionEvent:::", ...arguments);
// };

// HTMLElement = {};

// document = {
//   getElementById: function (id) {
//     console.log("getElementById:::", id);
//   },
//   cookie: "tenantId=default; _nano_fp=XpEbXqCanpCynpTyXo_dE6eZWtNkYNhmBA49~vn3",
//   referrer: "https://mms.pinduoduo.com/goods/goods_list",
//   createElement: function (tagName) {
//     console.log("createElement:::", tagName);
//     if (tagName === "video") {
//     }
//     return {};
//   },
//   addEventListener: function (type, listener, options) {
//     console.log("addEventListener:::", type, listener, options);
//     if (type === "mousedown") {
//     }
//     if (type === "mousemove") {
//     }

//     if (type === "click") {
//     }
//     if (type === "scroll") {
//     }
//     return undefined;
//   },
//   documentElement: {},
//   body: {},
//   visibilityState: "visible",
// };
// location = {
//   href: "https://mms.pinduoduo.com/goods/goods_list",
//   port: "",
// };
// navigator = {
//   webdriver: false,
//   userAgent:
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//   plugins: { 0: {} },
//   languages: ["zh-CN", "zh"],
// };
// history = {
//   back: function (e) {
//     console.log("back:::", e);
//   },
// };
// localStorage = {
//   getItem: function (key) {
//     console.log("getItem:::", key);

//     return this[key];
//     // return "XpEbXqCYX09xlpdoX9_2J14qn_Ozg_ckUxdhVHUS";
//   },

//   setItem: function (key, value) {
//     console.log("setItem:::", key, value);
//     this[key] = value;
//   },
// };
// screen = { availWidth: 1920, availHeight: 1040 };

// Element = {
//   prototype: {
//     attachShadow: function () {
//       console.log("attachShadow:::", ...arguments);
//     },
//   },
// };
