// ============================Navigator Start================================

function PermissionStatus() {
    this.name = "video_capture";
    this.onchange = null;
    this.state = "prompt";
    this.then = set_func_native(function then(resolve, reject) {
        if (this.state === "granted") {
            resolve(this);
        } else if (this.state === "denied") {
            reject(new DOMException("Permission denied", "PermissionDeniedError"));
        } else {
            // 等待状态变化
            this.onchange = () => {
                if (this.state === "granted") {
                    resolve(this);
                } else if (this.state === "denied") {
                    reject(new DOMException("Permission denied", "PermissionDeniedError"));
                }
            };
        }
    });
}

PermissionStatus.prototype = {
    constructor: PermissionStatus,
}
set_func_native(PermissionStatus);
Object.defineProperties(PermissionStatus.prototype, {
    [Symbol.toStringTag]: {
        value: "PermissionStatus",
        configurable: true
    }
})


function Permissions() {
}

Permissions.prototype = {
    constructor: Permissions,
    query: set_func_native(function query(options) {
        console.log("query options:", options);
        return new Promise((resolve, reject) => {
            resolve(watch(new PermissionStatus()));
        });
    }),
}
set_func_native(Permissions);

Object.defineProperties(Permissions.prototype, {
    [Symbol.toStringTag]: {
        value: "Permissions",
        configurable: true
    }
})

function NavigatorUserAgentData() {
}

set_func_native(NavigatorUserAgentData);

function Navigator() {
}


Navigator.prototype = {
    constructor: Navigator,
    userAgentData: watch(new NavigatorUserAgentData()),
    permissions: watch(new Permissions()),
    webdriver: false,
    plugins: [{"0": {}, "1": {}}],
    maxTouchPoints: 0,
    onLine: true,
    mimeTypes: [{suffixes: "pdf", type: "application/pdf"}],

    appCodeName: "Mozilla",
    appName: "Netscape",
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    platform: "MacIntel",
    language: "zh-CN",
    languages: ["zh-CN", "zh"],
    product: "Gecko",
    vendor: "Google Inc.",
};
Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true
    }
})
set_func_native(Navigator);
navigator = new Navigator()
Object.setPrototypeOf(navigator, Navigator.prototype)
window.navigator = navigator;
window.Navigator = Navigator;

// ============================Navigator End================================