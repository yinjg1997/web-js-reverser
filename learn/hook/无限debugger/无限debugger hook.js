// ==UserScript==
// @name         企查查-无限debugger
// @namespace    http://tampermonkey.net/
// @version      2025-11-22
// @description  try to take over the world!
// @author       You
// @match        https://www.qcc.com/web/search?key=%E6%B7%B1%E5%9C%B3%E5%B8%82%E6%B0%A6%E4%B8%89%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E8%B4%A3%E4%BB%BB%E5%85%AC%E5%8F%B8
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qcc.com
// @grant        none
// @run-at document-start
// ==/UserScript==
!(function () {
  let eval_back = eval;
  let eval = function (args) {
    if (args.includes("debugger")) {
      return null;
    } else {
      return eval_back(args);
    }
  };
  console.log("✅ eval hook success");
})();

!(function () {
  Function.prototype._constructor = Function.prototype.constructor;
  Function.prototype.constructor = function () {
    if (arguments.toString().includes("debugger")) {
      return null;
    }
    return Function.prototype._constructor.apply(this, arguments);
  };
  Object.freeze(Function.prototype.constructor);
  console.log("✅ constructor hook success");
})();

!(function () {
  let setInterval_back = setInterval;
  let setInterval = function (a, b) {
    if (a.toString().includes("debugger")) {
      return null;
    }
    return setInterval_back(a, b);
  };
  console.log("✅ setInterval hook success");
})();
