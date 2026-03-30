// ==UserScript==
// @name         企查查-无限debugger
// @namespace    http://tampermonkey.net/
// @version      2025-11-22
// @description  try to take over the world!
// @author       You
// @match        https://www.qcc.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qcc.com
// @grant        none
// @run-at document-start
// ==/UserScript==
!(function set_request_header_hook() {
    'use strict';

    // 保存原生的 setRequestHeader 方法
    const originalSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;

    // 重写 setRequestHeader 方法
    window.XMLHttpRequest.prototype.setRequestHeader = function (header, val) {


        console.log(`📌 拦截到请求头: ${header} ，值为：${val}`);
        if (header !== 'Accept' && header !== 'X-Requested-With' && header !== 'Content-Type' && header !== 'x-pid') {
            debugger;
        }

        // 调用原生方法，保证正常功能不受影响（绑定当前上下文 this）
        return originalSetHeader.apply(this, arguments);
    };
    console.log('✅ setRequestHeader Hook 已启动');
})();