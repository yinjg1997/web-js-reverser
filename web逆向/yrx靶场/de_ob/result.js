const {get_m} = require("./pro.js")
const axios = require('axios');

// 请求基础配置
const baseUrl = 'https://match.yuanrenxue.cn/api/question/2';
const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://match.yuanrenxue.cn/match/2',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    // 已按要求修改
    'user-agent': 'yuanrenxue',
    'x-requested-with': 'XMLHttpRequest',
    'cookie': `sessionid=fd4ufggspvzx05yzg09kki1kqpm1z882; m=${get_m()}`
};

// 固定参数
const params = {
    pageSize: 10,
    kw: '',
};

let totalSum = 0;

// 请求单页数据
async function getPage(page) {
    try {
        const res = await axios.get(baseUrl, {
            headers,
            params: {...params, page}
        });

        const {data} = res.data;
        const pageSum = data.reduce((a, b) => a + b, 0);
        totalSum += pageSum;

        console.log(`第 ${page} 页：${data.length} 条 | 本页和：${pageSum} | 累计：${totalSum}`);
        return data.length === 10; // 每页10条，不满10条说明最后一页
    } catch (err) {
        console.error(`第 ${page} 页失败：`, err.message);
        return false;
    }
}

// 自动爬取所有页
async function main() {
    console.log('开始请求所有数据...\n');
    let page = 1;
    let hasNext = true;

    while (hasNext) {
        hasNext = await getPage(page);
        page++;
        await new Promise(r => setTimeout(r, 600));
    }

    console.log('\n✅ 全部请求完成！');
    console.log('📊 所有数据总和 =', totalSum);
}

main();