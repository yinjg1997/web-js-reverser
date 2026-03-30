// ==UserScript==
// @name         绕过debugger+performance检测
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  精准破解debugger耗时+console打印耗时+日志清空的DevTools检测（带执行日志）
// @author       You
// @match        https://blog.aepkill.com/demos/devtools-detector/
// @match        https://theajack.github.io/disable-devtool/
// @match        https://sindresorhus.com/devtools-detect/
// @grant        none
// @run-at       document-start
// ==/UserScript==

// @run-at       document-start
// @run-at       document-end

// 劫持 document.cookie 设置
!(function set_cookie_hook() {
  "use strict";
  let _cookie = "";

  // 重写 document.cookie 的 getter/setter
  Object.defineProperty(document, "cookie", {
    set: function (val) {
      const key = val.split("=")[0];
      // web_session a1 abRequestId
      if (key.includes("abRequestId")) {
        console.log("📌 设置 cookie：", val);
        debugger;
      }

      _cookie = val;
      return val;
    },
    get: function () {
      return _cookie;
    },
  });
  console.log("✅ document.cookie Hook 已启动");
})();

!(function set_request_header_hook() {
  "use strict";
  console.log("✅ setRequestHeader Hook 已启动");
  // 要监听的请求头名称
  const target_header = "user-mnp";
  const originalSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;

  window.XMLHttpRequest.prototype.setRequestHeader = function (header, val) {
    console.log(`📌 拦截到 ${header} 请求头，值为：${val}`);
    if (header.toUpperCase() === target_header.toUpperCase()) {
      debugger;
    }
    return originalSetHeader.apply(this, arguments);
  };
})();

!(function object_property_hook() {
  "use strict";

  var xSTemp = "";
  console.log("✅ object_property_hook Hook 已启动");
  Object.defineProperty(a.headers, "esp-sature", {
    set: function (newVal) {
      console.log("Hook 捕获到目标字段设置 ->", newVal);
      debugger;
      xSTemp = newVal;
      return xSTemp;
    },

    get: function () {
      return xSTemp;
    },
  });
})();

// set_fetch_header_hook
("use strict");

const target_header = "user-mnp";

// 保存原生 fetch 方法
const originalFetch = window.fetch;

// 重写 fetch 方法
window.fetch = function (input, init = {}) {
  // 1. 处理请求头：确保 headers 是可操作的对象（兼容无 init/无 headers 的情况）
  const headers = new Headers(init.headers || {});

  // 2. 检查是否存在 hexin-v 请求头（忽略大小写）
  let targetValue = null;
  headers.forEach((value, name) => {
    if (name.toUpperCase() === target_header.toUpperCase()) {
      targetValue = value;
    }
  });

  // 3. 匹配到目标请求头时触发调试和日志
  if (targetValue) {
    debugger;
    console.log(`拦截到 ${target_header} 请求头，值为：`, targetValue);
  }

  // 4. 还原请求配置，调用原生 fetch 发送请求（保持原有功能）
  const newInit = { ...init, headers };
  return originalFetch.call(this, input, newInit);
};
!(() => {
  "use strict";

  const target_header = "user-mnp";

  // 保存原生 fetch 方法
  const originalFetch = window.fetch;

  // 重写 fetch 方法
  window.fetch = function (input, init = {}) {
    // 1. 处理请求头：确保 headers 是可操作的对象（兼容无 init/无 headers 的情况）
    const headers = new Headers(init.headers || {});

    // 2. 检查是否存在 hexin-v 请求头（忽略大小写）
    let targetValue = null;
    headers.forEach((value, name) => {
      console.log(`📌 拦截到 ${name} 请求头，值为：`, targetValue);
      if (name.toUpperCase() === target_header.toUpperCase()) {
        targetValue = value;
        // eslint-disable-next-line no-debugger
        debugger;
      }
    });
    // 4. 还原请求配置，调用原生 fetch 发送请求（保持原有功能）
    const newInit = { ...init, headers };
    return originalFetch.call(this, input, newInit);
  };

  console.log("✅ fetch_header_hook 已启动");
})();

// setInterval Hook 过无限debugger
function set_interval_hook() {
  const originalSetInterval = window.setInterval;

  // 重写 window.setInterval
  window.setInterval = function (...argumentsList) {
    // const [callback, delay, ...args] = argumentsList;

    // 打印 setInterval 关键信息（和之前风格一致）
    console.log("\n📌 Hook 捕获 setInterval 调用：");
    console.log("   回调函数:", callback);
    console.log("   执行间隔（毫秒）:", delay);
    console.log("   回调额外参数:", args.length > 0 ? args : "无");
    console.log("   回调函数源码:", callback.toString());

    // 调试断点（可注释）
    // debugger;
  };
}

// localStorage Hook 核心代码
!(function () {
  const originalSetItem = localStorage.setItem;
  const originalGetItem = localStorage.getItem;
  const originalRemoveItem = localStorage.removeItem;
  const originalClear = localStorage.clear;

  // Hook setItem (监听写入操作)
  localStorage.setItem = function (key, value) {
    console.log(`[localStorage Hook] 写入数据 -> 键: ${key}, 值: ${value}`);
    if (key === "b1") {
      debugger;
    }

    // 执行原生方法，保证原有功能正常
    return originalSetItem.call(this, key, value);
  };

  // Hook getItem (监听读取操作)
  localStorage.getItem = function (key) {
    const result = originalGetItem.call(this, key);
    console.log(
      `[localStorage Hook] 读取数据 -> 键: ${key}, 读取结果: ${result}`,
    );
    // 可选：篡改返回值（比如强制返回指定内容）
    // return "fake_value";

    return result;
  };

  // Hook removeItem (监听删除操作)
  localStorage.removeItem = function (key) {
    console.log(`[localStorage Hook] 删除数据 -> 键: ${key}`);
    return originalRemoveItem.call(this, key);
  };

  // Hook clear (监听清空操作)
  localStorage.clear = function () {
    console.log(`[localStorage Hook] 清空所有 localStorage 数据`);
    // 可选：阻止清空（注释掉下面一行即可）
    return originalClear.call(this);
  };

  console.log("[localStorage Hook] 已成功挂载！");
})();

// json_stringify_hook()
// json_parse_hook()
// set_cookie_hook()
// set_request_header_hook()
// set_fetch_header_hook()
// set_interval_hook();

!(() => {
  let original = undefined;

  Object.defineProperty(window, "eSHSM", {
    set: function (newValue) {
      console.log("📌 新值内容：", newValue);
      debugger;
      original = newValue;
    },
    get: function () {
      return original;
    },
    enumerable: true,
    configurable: true,
  });

  // 提示 Hook 挂载完成
  console.log("Hook（Object.defineProperty 版）已挂载，等待属性被赋值...");
})();

!(function proxyWindow() {
  const windowProxy = new Proxy(window, {
    set: function (target, propName, value, receiver) {
      if (propName === "xhsFingerprintV3") {
        console.log(
          "===================== Proxy 捕获到 window.xhsFingerprintV3 属性新增 =====================",
        );
        console.log("📌 属性初始赋值：", value);
        debugger;
      }

      // 3. 执行原逻辑：将属性赋值给 window ，保证页面正常运行
      Reflect.set(target, propName, value, receiver);
      return true;
    },
  });

  console.log("✅ Proxy 监控已启动，等待 window.xhsFingerprintV3 属性新增");
})();
