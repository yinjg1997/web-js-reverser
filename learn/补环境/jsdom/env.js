const {JSDOM} = require('jsdom');


// 3. 初始化 JSDOM 时配置资源加载和 Canvas 支持
const dom = new JSDOM(`<!DOCTYPE html>
<html><head>
    <meta charset="gbk">
    <title>A股市场_同花顺行情中心_同花顺财经网</title>
    <meta name="keywords" content="金融,金融网,金融服务,金融网站,金融信息,金融资讯,金融信息服务,投资,金融投资,投资理财,股票">
    <meta name="description" content="核新同花顺网络信息股份有限公司（同花顺）成立于1995年，是一家专业的互联网金融数据服务商，为您全方位提供财经资讯及全球金融市场行情，覆盖股票、基金、期货、外汇、债券、银行、黄金等多种面向个人和企业的服务。">
    <script type="text/javascript" src="//s.thsi.cn/js/chameleon/chameleon.1.7.min.1763278.js"></script>
</head></html>`,
    {
        // 启用资源加载（允许加载外部脚本）
        runScripts: "dangerously",
        // 支持 Canvas API（关键修复）
        resources: "usable",
        url: "https://q.10jqka.com.cn", // 关键：指定同花顺真实域名（同源策略生效）
        referrer: "https://q.10jqka.com.cn", // 模拟来源页（增强环境真实性）
        // 自定义 Canvas 实现
        beforeParse(window) {
            // 补全 HTMLCanvasElement 的 getContext 方法
            window.HTMLCanvasElement.prototype.getContext = function (contextType) {
                // 返回 canvas 库创建的上下文（支持 2d 和 webgl）
                return {};
            };

            // 补全 CanvasRenderingContext2D（避免后续方法调用报错）
            window.CanvasRenderingContext2D = class CanvasRenderingContext2D {
                constructor() {
                }

                // 补全常用方法（根据脚本需求扩展）
                fillRect() {
                }

                strokeRect() {
                }

                drawImage() {
                }

                getImageData() {
                    return {data: new Uint8ClampedArray(40000)}; // 模拟 100x100 图像数据
                }

                putImageData() {
                }

                clearRect() {
                }
            };
        }
    }
);

// 4. 挂载全局对象（修正 location 赋值错误）
window = dom.window;
document = window.document;
navigator = window.navigator;
location = window.location;

// 5. 补全 localStorage（jsdom 未默认实现）
if (!window.localStorage) {
    window.localStorage = {
        _data: {},
        getItem(key) {
            return this._data[key] || null;
        },
        setItem(key, value) {
            this._data[key] = String(value);
        },
        removeItem(key) {
            delete this._data[key];
        },
        clear() {
            this._data = {};
        }
    };
}


function getEnv(proxy_array) {
    for (let i = 0; i < proxy_array.length; i++) {
        handler = `{
            get: function(target, property, receiver) {
                   console.log('方法：get','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                   return target[property];
            },
            set: function(target, property, value, receiver){
                    console.log('方法：set','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                    return Reflect.set(...arguments);
            }
        }`;
        eval(`
            try {
                ${proxy_array[i]};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            } catch (e) {
                ${proxy_array[i]} = {};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            }
        `);
    }
}

const proxy_array = ['window', 'document', 'location', 'navigator', 'localStorage', 'cookie', 'head']
getEnv(proxy_array);