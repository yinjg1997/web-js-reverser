// 引入 AnyProxy
// AnyProxy 是一个 Node.js 实现的可编程 HTTP / HTTPS 代理工具
// 常用于：抓包、请求篡改、调试、注入脚本、分析流量等
const AnyProxy = require("anyproxy");

// AnyProxy 的启动配置项
const options = {

    // 代理服务器监听端口
    // 浏览器 / 系统代理指向 localhost:10086 即可
    port: 10086,

    // 代理规则文件
    // rules 中通常定义：
    // - 请求拦截（beforeSendRequest）
    // - 响应拦截（beforeSendResponse）
    // - HTTPS 证书处理等
    rule: require("./rules"),

    // Web 管理界面配置
    webInterface: {
        // 是否启用 Web UI
        // 用于实时查看请求、响应、日志等
        enable: true,

        // Web UI 的访问端口
        // 通常访问：http://localhost:8002
        webPort: 8002
    },

    // 限速配置（单位：字节 / 秒）
    // 用于模拟弱网环境，或防止代理占用过多带宽
    throttle: 10000,

    // 是否强制代理 HTTPS 请求
    // true 表示：
    // - 所有 HTTPS 请求都会被中间人代理
    // - 需要在客户端安装 AnyProxy 的根证书
    forceProxyHttps: true,

    // 是否拦截 WebSocket
    // false 表示：
    // - WebSocket 请求将直通
    // - 不参与代理和篡改
    wsIntercept: false, // 不开启websocket代理

    // 是否开启静默模式
    // false 表示：
    // - AnyProxy 会在控制台输出日志
    // - 包含请求、错误、启动信息等
    silent: false
};

// 创建代理服务器实例
// ProxyServer 是 AnyProxy 的核心类
const proxyServer = new AnyProxy.ProxyServer(options);

// 代理服务器准备就绪事件
// 当端口监听完成、代理初始化成功后触发
proxyServer.on("ready", () => { /* */ });

// 代理服务器错误事件
// 如端口被占用、证书异常、运行时错误等
proxyServer.on("error", (e) => { /* */ });

// 启动代理服务器
// 调用后：
// - HTTP / HTTPS 代理开始工作
// - Web UI（如果开启）可访问
proxyServer.start();
