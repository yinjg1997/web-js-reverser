// ==UserScript==
// @name         闲鱼商家过滤器
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  通过拦截搜索API响应，按seller_id过滤有风险的商家
// @match        https://www.goofish.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const DEFAULT_BLACKLIST = [
        // 'jmQKqr5UGG7tgtdfi072yQ==',
    ];
    const TARGET_API = 'mtop.taobao.idlemtopsearch.pc.search/1.0/';
    const blockedItemIds = new Set();

    function getBlacklist() {
        const stored = GM_getValue('seller_blacklist', null);
        if (stored) return stored;
        GM_setValue('seller_blacklist', DEFAULT_BLACKLIST);
        return DEFAULT_BLACKLIST;
    }

    function hideBlockedItems(root = document) {
        if (!blockedItemIds.size) return;
        const links = root.querySelectorAll('a[href*="/item?id="]');
        let hidden = 0;

        for (const link of links) {
            const href = link.getAttribute('href') || '';
            const match = href.match(/[?&]id=(\d+)/);
            const itemId = match?.[1];
            if (!itemId || !blockedItemIds.has(itemId)) continue;
            if (link.dataset.sellerFilterHidden === '1') continue;

            link.dataset.sellerFilterHidden = '1';
            link.style.display = 'none';
            hidden++;
        }

        if (hidden) console.log(`[闲鱼过滤器] 已隐藏 ${hidden} 个商品卡片`);
    }

    function collectBlockedItems(jsonText) {
        const blacklist = getBlacklist();
        if (!blacklist.length || typeof jsonText !== 'string') return;

        try {
            const resp = JSON.parse(jsonText);
            const list = resp?.data?.resultList;
            if (!Array.isArray(list)) return;

            let added = 0;
            for (const entry of list) {
                const item = entry?.data?.item;
                const sellerId = item?.main?.clickParam?.args?.seller_id;
                const itemId = String(item?.itemId ?? item?.main?.clickParam?.args?.id ?? '');
                if (!sellerId || !itemId) continue;
                if (!blacklist.includes(sellerId)) continue;
                if (blockedItemIds.has(itemId)) continue;

                blockedItemIds.add(itemId);
                added++;
                console.log(`[闲鱼过滤器] 标记 item ${itemId}，seller ${sellerId}`);
            }

            if (added) {
                console.log(`[闲鱼过滤器] 新增 ${added} 个待隐藏商品，累计 ${blockedItemIds.size} 个`);
                hideBlockedItems();
            }
        } catch (_) {
            // 忽略解析失败
        }
    }

    function isTargetUrl(url) {
        return typeof url === 'string' && url.includes(TARGET_API);
    }

    function installXhrWatcher() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._sellerFilterUrl = typeof url === 'string' ? url : String(url);
            return originalOpen.call(this, method, url, ...args);
        };

        XMLHttpRequest.prototype.send = function (...args) {
            if (isTargetUrl(this._sellerFilterUrl)) {
                this.addEventListener('load', function () {
                    try {
                        collectBlockedItems(this.responseText);
                    } catch (_) {
                        // 保持原始行为
                    }
                }, true);
            }
            return originalSend.apply(this, args);
        };
    }

    function installFetchWatcher() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            const response = await originalFetch.call(this, input, init);
            const url = typeof input === 'string' ? input : input?.url;
            if (!isTargetUrl(url)) return response;

            try {
                collectBlockedItems(await response.clone().text());
            } catch (_) {
                // 保持原始行为
            }
            return response;
        };
    }

    function installDomObserver() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (!(node instanceof Element)) continue;
                    if (node.matches?.('a[href*="/item?id="]')) {
                        hideBlockedItems(node.parentElement || node);
                        continue;
                    }
                    hideBlockedItems(node);
                }
            }
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => hideBlockedItems(), { once: true });
        } else {
            hideBlockedItems();
        }
    }

    GM_registerMenuCommand('编辑 seller_id 黑名单', () => {
        const current = getBlacklist();
        const input = prompt(
            '输入要屏蔽的 seller_id，逗号分隔：\n（加密 id，如 jmQKqr5UGG7tgtdfi072yQ==）',
            current.join(', ')
        );
        if (input === null) return;
        const newList = input.split(/[,，\n]+/).map(s => s.trim()).filter(Boolean);
        GM_setValue('seller_blacklist', newList);
        alert('黑名单已更新（' + newList.length + ' 条），刷新生效。');
    });

    installXhrWatcher();
    installFetchWatcher();
    installDomObserver();

    console.log('[闲鱼过滤器] 已加载，黑名单:', getBlacklist());
})();