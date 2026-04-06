// ==UserScript==
// @name         猿人学
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://match.yuanrenxue.cn/match/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=match.yuanrenxue.cn
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const _setInterval = setInterval;
    setInterval = function (fn, delay) {
        const fnStr = fn.toString();
        if (fnStr.includes('debugger')) {
            return _setInterval(function () {
            }, delay);
        }
        // return _setInterval(fn, delay);
        return _setInterval(()=>{}, delay);
    };

    const _Function = Function;
    Function = function (...args) {
        const fnStr = args.join('');
        if (fnStr.includes('debugger')) {
            return _Function();
        }
        return _Function(...args);
    };


    // Object.defineProperty(window, 'f', {
    //     get() {
    //         debugger;
    //         return this._f;
    //     },
    //     set(val) {
    //         debugger;
    //         this._f = val;
    //     },
    //     configurable: true
    // });
})();
