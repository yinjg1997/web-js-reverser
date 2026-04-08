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
    const _realConsole = window.console;
    // 冻结 console，防止被覆盖
    Object.defineProperty(window, 'console', {
        get: function () {
            return _realConsole;
        },
        set: function () {
        },
        configurable: false
    });
    console.warn('hook.js loaded');
    const _setInterval = setInterval;
    setInterval = function (fn, delay) {
        const fnStr = fn.toString();
        if (fnStr.includes('debugger')) {
            return _setInterval(function () {
            }, delay);
        }
        return _setInterval(fn, delay);
        // console.log('hook setInterval');
        // return _setInterval(() => {
        // }, delay);
    };

    const _origFunction = Function.prototype.constructor;

    Function.prototype.constructor = function (...args) {
        args = args.map(arg =>
            typeof arg === 'string' ? arg.replace(/debugger/g, '"debugger"') : arg
        );
        return _origFunction.apply(this, args);
    };

    const _origEval = window.eval;
    window.eval = function () {
        let args = Array.prototype.slice.call(arguments);
        args = args.map(value => {
            if (typeof value === 'string') {
                return value.replace(/debugger/g, "");
            }
            return value;
        });
        return _origEval.apply(this, args);
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
