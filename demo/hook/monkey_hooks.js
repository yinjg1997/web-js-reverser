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


(function() {
    'use strict';

    // // ========== 1. 核心变量重置 ==========
    // // 停止所有检测定时器
    // if (window.DisableDevtool && window.DisableDevtool.isRunning) {
    //     window.DisableDevtool.isRunning = false;
    //     window.DisableDevtool.isSuspend = true;
    // }

    // 清除所有定时器（包括检测轮询）
    const clearAllTimers = () => {
        let i = 0;
        // 循环清除所有定时器（兼容不同环境的定时器ID）
        while (i < 1000) {
            window.clearInterval(i);
            window.clearTimeout(i);
            i++;
        }
    };
    clearAllTimers();

    console.log('✅清除所有定时器 Hook已生效');
})();

(function () {
    'use strict';

    // 日志前缀（方便区分自定义日志）
    const LOG_PREFIX = '[DevTools检测绕过]';

    // ========== 拦截Function.constructor中的debugger ==========
    (function () {
        try {
            const originalFunctionConstructor = Function.prototype.constructor;
            // 重写构造函数，过滤debugger语句
            Function.prototype.constructor = function (...args) {
                try {
                    const filteredArgs = args.map(arg => {
                        if (typeof arg === 'string') {
                            console.log(`${LOG_PREFIX} 拦截到Function构造函数执行，过滤debugger语句`);
                            return arg.replace(/debugger/g, ''); // 移除所有debugger关键词
                        }
                        return arg;
                    });
                } catch (e) {
                    console.error(`${LOG_PREFIX} 拦截Function构造函数执行失败 ❌`, e);
                }
                return originalFunctionConstructor.apply(this, filteredArgs);
            };
            // 冻结构造函数，防止被还原
            Object.freeze(Function.prototype.constructor);

            console.log(`${LOG_PREFIX} 第一步：Function.constructor拦截成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第一步：Function.constructor拦截失败 ❌`, e);
        }
    })();

    // ========== 重写时间函数，强制耗时<100ms ==========
    (function () {
        try {
            // 1. 重写performance.now
            const originalPerformanceNow = performance.now;
            let lastPerfNow = originalPerformanceNow.call(performance);
            performance.now = function () {
                lastPerfNow += 0.1;
                return lastPerfNow;
            };
            Object.freeze(performance);
            console.log(`${LOG_PREFIX} - performance.now重写成功`);

            // 2. 兼容：重写Date.now（防止检测代码换用该API）
            const originalDateNow = Date.now;
            let lastDateNow = originalDateNow();
            Date.now = function () {
                lastDateNow += 1; // 每次增加1ms，耗时差远小于100
                return lastDateNow;
            };
            Object.freeze(Date);
            console.log(`${LOG_PREFIX} - Date.now重写成功`);

            // 3. 兼容：重写自定义window.now（兜底）
            if (window.now) {
                const originalWindowNow = window.now;
                let lastWindowNow = originalWindowNow();
                window.now = function () {
                    lastWindowNow += 0.1;
                    return lastWindowNow;
                };
                Object.freeze(window.now);
                console.log(`${LOG_PREFIX} - window.now重写成功`);
            } else {
                console.log(`${LOG_PREFIX} - window.now不存在，跳过重写`);
            }

            console.log(`${LOG_PREFIX} 第二步：时间函数重写成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第二步：时间函数重写失败 ❌`, e);
        }
    })();

    // ========== 屏蔽所有debugger语句 ==========
    (function () {
        try {
            // 1. 覆盖原生debugger行为
            window.debugger = function () {
                console.log(`${LOG_PREFIX} 拦截到debugger调用，已屏蔽`);
            };
            Object.freeze(window.debugger);
            console.log(`${LOG_PREFIX} - window.debugger屏蔽成功`);

            // 2. 强化拦截eval中的debugger
            const originalEval = window.eval;
            window.eval = function (code) {
                if (typeof code === 'string' && code.includes('debugger')) {
                    console.log(`${LOG_PREFIX} 拦截到eval执行的debugger，已过滤`);
                    code = code.replace(/debugger/g, ''); // 过滤debugger
                }
                return originalEval.call(window, code);
            };
            Object.freeze(window.eval);
            console.log(`${LOG_PREFIX} - eval拦截debugger成功`);

            console.log(`${LOG_PREFIX} 第三步：debugger屏蔽成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第三步：debugger屏蔽失败 ❌`, e);
        }
    })();

    // ========== 重写console ==========
    (function () {
        try {
            // 保存原生方法
            const originalConsoleLog = console.log;
            const originalConsoleTable = console.table;
            const originalConsoleClear = console.clear;

            // 1. 拦截console.clear，阻止日志清空
            console.clear = function () {
                console.log(`${LOG_PREFIX} 拦截到console.clear()，已阻止日志清空 🛡️`);
            };
            console.log(`${LOG_PREFIX} - console.clear拦截成功`);

            // 2. 重写console.table，篡改打印耗时
            console.table = function (...args) {
                console.log(`${LOG_PREFIX} 拦截到console.table调用，篡改打印耗时`);
                // 执行原生table保证功能正常，同时抹平耗时
                return originalConsoleTable.apply(console, args);
            };
            console.log(`${LOG_PREFIX} - console.table耗时篡改成功`);

            // 3. 重写console.log，兼容原有逻辑+篡改打印耗时
            console.log = function (...args) {
                // 跳过自身日志的耗时计算（避免干扰）
                if (args[0] && typeof args[0] === 'string' && args[0].includes(LOG_PREFIX)) {
                    return originalConsoleLog.apply(console, args);
                }

                // 原有逻辑：检测%c格式化占位符
                const hasFormatSpecifier = args.some(arg => typeof arg === 'string' && arg.includes('%c'));
                if (hasFormatSpecifier) {
                    console.log(`${LOG_PREFIX} 拦截到%c格式化日志，跳过DevTools解析`);
                    Reflect.apply(originalConsoleLog, console, args);
                    return;
                }

                // 篡改普通log打印耗时
                console.log(`${LOG_PREFIX} 拦截到console.log调用，固定打印耗时`);
                Reflect.apply(originalConsoleLog, console, args);
            };

            // 冻结console，防止被还原
            Object.defineProperties(console, {
                log: {value: console.log, writable: false, configurable: false},
                table: {value: console.table, writable: false, configurable: false},
                clear: {value: console.clear, writable: false, configurable: false}
            });

            console.log(`${LOG_PREFIX} 第四步：console重写（防清空+防耗时检测）成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第四步：console重写失败 ❌`, e);
        }
    })();

    // ========== 尺寸检测篡改 ==========
    (function () {
        try {
            // 重写innerWidth/innerHeight，让outer-inner差值为0
            Object.defineProperties(window, {
                innerWidth: {
                    get: () => window.outerWidth,
                    configurable: false
                },
                innerHeight: {
                    get: () => window.outerHeight,
                    configurable: false
                }
            });
            console.log(`${LOG_PREFIX} - window.innerWidth/innerHeight重写成功`);

            // 篡改screen尺寸（针对Firefox分离式DevTools检测）
            Object.defineProperties(window.screen, {
                width: {
                    get: () => window.innerWidth,
                    configurable: false
                },
                height: {
                    get: () => window.innerHeight,
                    configurable: false
                }
            });
            console.log(`${LOG_PREFIX} - window.screen尺寸重写成功`);

            console.log(`${LOG_PREFIX} 第五步：尺寸变量篡改成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第五步：尺寸变量篡改失败 ❌`, e);
        }
    })();


    // ========== 重写setInterval/clearInterval ==========
    (function () {
        try {
            // 保存原生方法
            const originalSetInterval = window.setInterval;
            const originalClearInterval = window.clearInterval;

            // 存储所有interval ID，防止被恶意清除
            const intervalMap = new Map();
            let fakeIntervalId = 10000;

            // 1. 重写setInterval：拦截执行逻辑，伪装定时任务
            window.setInterval = function (callback, delay, ...args) {
                console.log(`${LOG_PREFIX} 拦截到setInterval调用，延迟：${delay}ms`);

                // 过滤回调中的检测逻辑（比如debugger/耗时检测）
                const filteredCallback = function () {
                    try {
                        // 若回调是函数，执行前过滤debugger
                        if (typeof callback === 'function') {
                            const callbackStr = callback.toString();
                            if (callbackStr.includes('debugger') || callbackStr.includes('performance.now')) {
                                console.log(`${LOG_PREFIX} 过滤interval回调中的检测逻辑`);
                                return;
                            }
                        }
                        return callback.apply(this, args);
                    } catch (e) {
                        console.error(`${LOG_PREFIX} interval回调执行异常`, e);
                        return null;
                    }
                };

                // 调用原生setInterval，使用过滤后的回调
                const realId = originalSetInterval(filteredCallback, delay, ...args);
                // 映射自定义ID，防止外部通过ID清除
                const fakeId = fakeIntervalId++;
                intervalMap.set(fakeId, realId);

                console.log(`${LOG_PREFIX} setInterval映射：假ID=${fakeId} → 真ID=${realId}`);
                return fakeId; // 返回假ID
            };

            // 2. 重写clearInterval：根据映射关系清除真实ID
            window.clearInterval = function (intervalId) {
                console.log(`${LOG_PREFIX} 拦截到clearInterval调用，传入ID：${intervalId}`);

                // 查找真实ID
                const realId = intervalMap.get(intervalId) || intervalId;
                if (intervalMap.has(intervalId)) {
                    intervalMap.delete(intervalId);
                    console.log(`${LOG_PREFIX} clearInterval：假ID=${intervalId} → 真ID=${realId}`);
                }

                // 执行原生清除
                return originalClearInterval(realId);
            };

            // 冻结方法，防止被还原
            Object.defineProperties(window, {
                setInterval: {value: window.setInterval, writable: false, configurable: false},
                clearInterval: {value: window.clearInterval, writable: false, configurable: false}
            });

            // 兜底：防止intervalMap被篡改
            Object.freeze(intervalMap);

            console.log(`${LOG_PREFIX} - setInterval重写成功`);
            console.log(`${LOG_PREFIX} - clearInterval重写成功`);
            console.log(`${LOG_PREFIX} 第七步：Interval重写成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第七步：Interval重写失败 ❌`, e);
        }
    })();

    // ========== 第八步：拦截setTimeout+阻断检测循环（核心新增） ==========
    (function () {
        try {
            // 保存原生方法
            const originalSetTimeout = window.setTimeout;
            const originalClearTimeout = window.clearTimeout;

            // 存储timeout ID映射，防止被清除
            const timeoutMap = new Map();
            let fakeTimeoutId = 20000; // 自定义起始ID

            // 1. 重写setTimeout：核心阻断_detectLoop循环
            window.setTimeout = function (callback, delay, ...args) {
                console.log(`${LOG_PREFIX} 拦截到setTimeout调用，延迟：${delay}ms`);

                // 关键：检测是否是_detectLoop检测循环的回调
                const callbackStr = typeof callback === 'function' ? callback.toString() : callback + '';
                if (
                    callbackStr.includes('debugger') || callbackStr.includes('performance.now')
                ) {
                    console.log(`${LOG_PREFIX} 检测到DevTools循环检测回调，直接阻断执行 ❌`);
                    // 返回假ID，不执行任何定时任务
                    const fakeId = fakeTimeoutId++;
                    timeoutMap.set(fakeId, -1); // 标记为检测循环，无真实ID
                    return fakeId;
                }

                // 过滤普通回调中的检测逻辑
                const filteredCallback = function () {
                    try {
                        if (typeof callback === 'function') {
                            const cbStr = callback.toString();
                            if (cbStr.includes('debugger') || cbStr.includes('performance.now')) {
                                console.log(`${LOG_PREFIX} 过滤timeout回调中的检测逻辑`);
                                return;
                            }
                        }
                        // return callback.apply(this, args);
                        return null; // 不执行回调函数了
                    } catch (e) {
                        console.error(`${LOG_PREFIX} timeout回调执行异常`, e);
                        return null;
                    }
                };

                // 普通定时任务：正常执行，映射假ID
                const realId = originalSetTimeout(filteredCallback, delay, ...args);
                const fakeId = fakeTimeoutId++;
                timeoutMap.set(fakeId, realId);

                console.log(`${LOG_PREFIX} setTimeout映射：假ID=${fakeId} → 真ID=${realId}`);
                return fakeId;
            };

            // 2. 重写clearTimeout：兼容假ID映射
            window.clearTimeout = function (timeoutId) {
                console.log(`${LOG_PREFIX} 拦截到clearTimeout调用，传入ID：${timeoutId}`);

                const realId = timeoutMap.get(timeoutId) || timeoutId;
                if (timeoutMap.has(timeoutId)) {
                    timeoutMap.delete(timeoutId);
                    console.log(`${LOG_PREFIX} clearTimeout：假ID=${timeoutId} → 真ID=${realId}`);
                }

                // 若标记为检测循环ID，不执行清除
                if (realId !== -1) {
                    return originalClearTimeout(realId);
                }
                return true;
            };

            // 3. 冻结setTimeout/clearTimeout，防止被还原
            Object.defineProperties(window, {
                setTimeout: {value: window.setTimeout, writable: false, configurable: false},
                clearTimeout: {value: window.clearTimeout, writable: false, configurable: false}
            });


            console.log(`${LOG_PREFIX} 第八步：setTimeout重写成功 ✅`);
        } catch (e) {
            console.error(`${LOG_PREFIX} 第八步：setTimeout重写失败 ❌`, e);
        }
    })();

    // 最终汇总日志
    console.log(`${LOG_PREFIX} 所有绕过脚本加载完成 🚀`);
    console.log(`${LOG_PREFIX} 已覆盖：debugger检测 + console打印耗时检测 + 日志清空拦截`);

})();
