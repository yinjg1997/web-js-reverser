// ==UserScript==
// @name         无限debugger
// @namespace    http://tampermonkey.net/
// @version      2025-11-22
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qcc.com
// @grant        none
// @run-at document-start
// ==/UserScript==
!(function () {
  const _eval = globalThis.eval.bind(globalThis);

  Object.defineProperty(globalThis, "eval", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (args) {
      if (typeof args !== "string") {
        return _eval(args);
      }

      // 将所有 debugger 变体替换为空字符串
      const cleaned = args
        .replace(/\bdebugger\b/g, "")

      if (cleaned !== args) {
        console.warn("[eval hook] removed debugger →", args.slice(0, 80));
      }

      return _eval(cleaned);
    },
  });

  console.log("✅ eval hook success");
})();

!(function () {
  const _constructor = Function.prototype.constructor;

  Object.defineProperty(Function.prototype, "constructor", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (...args) {
      // 将每个参数中的 debugger 变体替换为空字符串
      const cleaned = args.map((arg) =>
        typeof arg === "string"
          ? arg
              .replace(/\bdebugger\b/g, "")
              .replace(/\\x64\\x65\\x62\\x75\\x67\\x67\\x65\\x72/g, "")
              .replace(/\\u0064\\u0065\\u0062\\u0075\\u0067\\u0067\\u0065\\u0072/g, "")
          : arg
      );

      if (cleaned.join("") !== args.join("")) {
        console.warn("[constructor hook] removed debugger →", args.join("").slice(0, 80));
      }

      return _constructor.apply(this, cleaned);
    },
  });

  console.log("✅ constructor hook success");
})();

!(function () {
  const _setInterval = globalThis.setInterval.bind(globalThis);

  Object.defineProperty(globalThis, "setInterval", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (fn, delay, ...args) {
      if (typeof fn === "string") {
        // 字符串形式：setInterval("debugger", 100)
        const cleaned = fn
          .replace(/\bdebugger\b/g, "")
          .replace(/\\x64\\x65\\x62\\x75\\x67\\x67\\x65\\x72/g, "")
          .replace(/\\u0064\\u0065\\u0062\\u0075\\u0067\\u0067\\u0065\\u0072/g, "");

        if (cleaned !== fn) {
          console.warn("[setInterval hook] removed debugger in string →", fn.slice(0, 80));
        }
        return _setInterval(cleaned, delay, ...args);

      } else if (typeof fn === "function") {
        // 函数形式：setInterval(function(){ debugger }, 100)
        const fnStr = fn.toString();
        if (/\bdebugger\b/.test(fnStr)) {
          console.warn("[setInterval hook] removed debugger in function →", fnStr.slice(0, 80));
          // 替换函数体中的 debugger 后重新构造函数
          const cleaned = fnStr.replace(/\bdebugger\b/g, "");
          fn = new Function(`return (${cleaned})`)();
        }
        return _setInterval(fn, delay, ...args);

      } else {
        return _setInterval(fn, delay, ...args);
      }
    },
  });

  console.log("✅ setInterval hook success");
})();