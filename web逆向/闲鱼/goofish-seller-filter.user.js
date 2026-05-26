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
    const itemSellerMap = new Map();

    function getBlacklist() {
        const stored = GM_getValue('seller_blacklist', null);
        if (stored) return stored;
        GM_setValue('seller_blacklist', DEFAULT_BLACKLIST);
        return DEFAULT_BLACKLIST;
    }

    function saveBlacklist(list) {
        GM_setValue('seller_blacklist', list);
    }

    function getItemIdFromLink(link) {
        const href = link.getAttribute('href') || '';
        const match = href.match(/[?&]id=(\d+)/);
        return match?.[1] || '';
    }

    function createSellerUi(link, itemId, sellerId) {
        if (link.querySelector('[data-seller-filter-ui="1"]')) return;

        link.style.position = 'relative';

        const panel = document.createElement('div');
        panel.dataset.sellerFilterUi = '1';
        panel.style.position = 'absolute';
        panel.style.top = '8px';
        panel.style.right = '8px';
        panel.style.zIndex = '20';
        panel.style.display = 'flex';
        panel.style.alignItems = 'center';
        panel.style.gap = '6px';

        const blockButton = document.createElement('button');
        blockButton.type = 'button';
        blockButton.textContent = '不看该卖家';
        blockButton.title = `seller_id: ${sellerId}`;
        blockButton.style.border = 'none';
        blockButton.style.borderRadius = '4px';
        blockButton.style.padding = '4px 8px';
        blockButton.style.background = '#ff4d4f';
        blockButton.style.color = '#fff';
        blockButton.style.cursor = 'pointer';
        blockButton.style.fontSize = '12px';
        blockButton.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.25)';

        blockButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const blacklist = getBlacklist();
            if (!blacklist.includes(sellerId)) {
                saveBlacklist([...blacklist, sellerId]);
            }
            blockedItemIds.add(itemId);
            link.dataset.sellerFilterHidden = '1';
            link.style.display = 'none';
            console.log(`[闲鱼过滤器] 已屏蔽 seller ${sellerId}，item ${itemId}`);
        });

        panel.appendChild(blockButton);
        link.appendChild(panel);
    }

    function processItemCards(root = document) {
        const links = root.querySelectorAll('a[href*="/item?id="]');
        let hidden = 0;

        for (const link of links) {
            const itemId = getItemIdFromLink(link);
            if (!itemId) continue;

            if (blockedItemIds.has(itemId)) {
                if (link.dataset.sellerFilterHidden === '1') continue;
                link.dataset.sellerFilterHidden = '1';
                link.style.display = 'none';
                hidden++;
                continue;
            }

            const sellerId = itemSellerMap.get(itemId);
            if (sellerId) {
                createSellerUi(link, itemId, sellerId);
            }
        }

        if (hidden) console.log(`[闲鱼过滤器] 已隐藏 ${hidden} 个商品卡片`);
    }

    function collectBlockedItems(jsonText) {
        const blacklist = getBlacklist();
        if (typeof jsonText !== 'string') return;

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

                itemSellerMap.set(itemId, sellerId);

                if (!blacklist.includes(sellerId)) continue;
                if (blockedItemIds.has(itemId)) continue;

                blockedItemIds.add(itemId);
                added++;
                console.log(`[闲鱼过滤器] 标记 item ${itemId}，seller ${sellerId}`);
            }

            processItemCards();

            if (added) {
                console.log(`[闲鱼过滤器] 新增 ${added} 个待隐藏商品，累计 ${blockedItemIds.size} 个`);
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
                        processItemCards(node.parentElement || node);
                        continue;
                    }
                    processItemCards(node);
                }
            }
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => processItemCards(), { once: true });
        } else {
            processItemCards();
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
        saveBlacklist(newList);
        alert('黑名单已更新（' + newList.length + ' 条），刷新生效。');
    });

    installXhrWatcher();
    installFetchWatcher();
    installDomObserver();

    console.log('[闲鱼过滤器] 已加载，黑名单:', getBlacklist());
})();