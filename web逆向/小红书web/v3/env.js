function watch(object, name) {
    const handler = {
        get: function (target, property, receiver) {
            if (
                property !== "isNaN" &&
                property !== "encodeURI" &&
                property !== "Uint8Array" &&
                property !== "undefined" &&
                property !== "JSON"
            ) {
                console.log(
                    "对象:",
                    name || object,
                    "方法:",
                    "\x1B[32m[GET]\x1B[0m",
                    "属性名:",
                    property,
                    "属性名类型:",
                    typeof property,
                    "\x1B[33m属性值:\x1B[0m",
                    target[property],
                    "属性值类型:",
                    typeof target[property],
                );
            }
            return Reflect.get(...arguments);
        },
        set: function (target, property, value, receiver) {
            console.log(
                "对象:",
                name || object,
                "方法:",
                "\x1B[31m[SET]\x1B[0m",
                "属性名:",
                property,
                //"新属性值:", value,
                "新属性值类型:",
                typeof value,
                "旧属性值:",
                target[property],
                "旧属性值类型:",
                typeof target[property],
            );
            return Reflect.set(...arguments);
        },
    };
    return new Proxy(object, handler);
}

function set_func_native(func) {
    //处理安全函数
    Function.prototype.$call = Function.prototype.call;
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol("(".concat("", ")"));

    const myToString = function myToString() {
        return (
            (typeof this === "function" && this[myFunction_toString_symbol]) ||
            $toString.$call(this)
        );
    };

    const set_native = function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value,
        });
    };

    delete Function.prototype["toString"];
    set_native(Function.prototype, "toString", myToString);
    set_native(
        Function.prototype.toString,
        myFunction_toString_symbol,
        "function toString() { [native code] }",
    );

    const safe_Function = function safe_Function(func) {
        set_native(
            func,
            myFunction_toString_symbol,
            "function" + (func.name ? " " + func.name : "") + "() { [native code] }",
        );
        return func;
    };

    return safe_Function(func);
}

/**
 * 通用封装：创建模拟浏览器对象（如 navigator、location 等）
 * @param {string} constructorName - 构造函数名称（如 "Navigator"、"Location"）
 * @param {Object} prototypeProps - 原型上的属性集合（模拟的核心属性）
 * @param parentConstructorName
 */
function createMockBrowserObject(
    constructorName,
    prototypeProps = {},
    parentConstructorName,
) {
    // 创建空构造函数
    const Constructor = new Function(`
        return function ${constructorName}() {
            if (${parentConstructorName ? `window['${parentConstructorName}']` : "false"}) {
                window['${parentConstructorName}'].call(this);
            }
        }
    `)();
    Constructor.name = constructorName;

    set_func_native(Constructor);

    // 实现原型链继承
    const ParentConstructor = parentConstructorName
        ? window[parentConstructorName]
        : null;
    if (ParentConstructor) {
        // 用 Object.create
        Constructor.prototype = Object.create(ParentConstructor.prototype, {
            // 修复 constructor 指向（否则会指向 ParentConstructor）
            constructor: {
                value: Constructor,
                enumerable: false,
                configurable: true,
                writable: true,
            },
        });
    } else {
        // 无父类时，直接创建原型对象
        Constructor.prototype = {
            constructor: Constructor,
        };
    }

    // 合并自定义原型属性
    Object.assign(Constructor.prototype, prototypeProps);

    // 添加 Symbol.toStringTag
    Object.defineProperties(Constructor.prototype, {
        [Symbol.toStringTag]: {
            value: constructorName,
            configurable: true,
        },
    });

    // 创建实例
    const instance = new Constructor();

    // 将构造函数挂载到 window
    window[constructorName] = Constructor;

    // 返回构造函数和实例
    return {Constructor, instance};
}

// ====Window Start====
window = globalThis;
window.top = window.window = window.self = window;
window.Buffer = Buffer;
delete global;
delete Buffer
delete __dirname;
delete __filename;
delete process;
// delete globalThis.navigator;

// ================================ XMLHttpRequest ==================
const {Constructor: XMLHttpRequest, instance: xmlHttpRequestInstance} =
    createMockBrowserObject("XMLHttpRequest", {
        open: set_func_native(function open() {
        }),
        send: set_func_native(function send() {
        }),
        setRequestHeader: set_func_native(function setRequestHeader() {
        }),
        addEventListener: set_func_native(function addEventListener() {
        }),
    });

Object.defineProperties(window, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true,
    },
});

function Window() {
    throw new TypeError("Illegal constructor");
}

Window.prototype = {
    constructor: Window,
    setTimeout: set_func_native(function setTimeout(x, y) {
        typeof x == "function" ? x() : undefined;
        typeof x == "string" ? eval(x) : undefined;
        return 123;
    }),
    setInterval: set_func_native(function setInterval(x, y) {
        typeof x == "function" ? x() : undefined;
        typeof x == "string" ? eval(x) : undefined;
        return 123;
    }),
    clearTimeout: set_func_native(function clearTimeout(x, y) {
    }),
    DeviceMotionEvent: set_func_native(function DeviceMotionEvent() {
        debugger;
    }),
    DeviceOrientationEvent: set_func_native(function DeviceOrientationEvent() {
        debugger;
    }),
    addEventListener: set_func_native(
        function addEventListener(type, listener, options) {
            // debugger
        },
    ),
    MouseEvent: set_func_native(function MouseEvent(type, listener, options) {
    }),
    requestAnimationFrame: set_func_native(
        function requestAnimationFrame(x, y) {
        },
    ),
    requestIdleCallback: set_func_native(function requestIdleCallback(x, y) {
    }),
    XMLHttpRequest: XMLHttpRequest,
};
set_func_native(Window);

Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true,
    },
});

Object.setPrototypeOf(window, Window.prototype);
// 赋值空对象最好使用这种class chrome{} 形式，而不是 {},因为这样我们可以看名字，并且最好挂上代理
window.chrome = watch({
    webstore: undefined,
}, "window chrome");
window.opr = undefined;
window.mozInnerScreenY = undefined;
window.safari = undefined;
window.StyleMedia = undefined;
window.loadts = Date.now().toString();
window.__wxjs_environment = undefined;
window.__wxWebEnv = undefined;
window.__wxjs_is_wkwebview = undefined;

window.xsecappid = "xhs-pc-web";
window.process = {
    env: {
        BROWSER: true,
        BUILD_ENV: "production",
    },
};


createMockBrowserObject("PermissionStatus", {
    name: "video_capture",
    onchange: null,
    state: "prompt",
    then: set_func_native(function then(resolve, reject) {
    }),
});

createMockBrowserObject("Permissions", {
    query: set_func_native(function query(options) {
        console.log("query options:", options);
        return new Promise((resolve, reject) => {
            resolve(watch(new PermissionStatus()));
        });
    }),
});

// ============================Navigator Start================================
createMockBrowserObject("NavigatorUserAgentData", {});
createMockBrowserObject("Navigator", {
    userAgentData: watch(new NavigatorUserAgentData()),
    permissions: watch(new Permissions()),
    webdriver: false,
    plugins: [{0: {}, 1: {}}],
    maxTouchPoints: 0,
    onLine: true,
    mimeTypes: [{suffixes: "pdf", type: "application/pdf"}],

    appCodeName: "Mozilla",
    appName: "Netscape",
    userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    platform: "MacIntel",
    language: "zh-CN",
    languages: ["zh-CN", "zh"],
    product: "Gecko",
    vendor: "Google Inc.",
});

window.navigator = new Navigator();

// ============================Navigator End================================

// ================================Screen Start================================
createMockBrowserObject("Screen", {
    width: 1920,
    height: 1080,
    availWidth: 1440,
    availHeight: 900,
    colorDepth: 24,
    pixelDepth: 24,
});

window.screen = new Screen();
// ================================Screen End================================

// ================================Location Start================================
createMockBrowserObject("Location", {
    href: "https://www.xiaohongshu.com/",
    protocol: "https:",
    host: "www.xiaohongshu.com",
    hostname: "www.xiaohongshu.com",
    port: "",
    pathname: "/explore",
    search: "",
    hash: "",
});
window.location = new Location();

// ================================Location End================================

// ================================Performance Start================================
createMockBrowserObject("Performance", {
    now: set_func_native(function now() {
        return new Date();
    }),
    getEntriesByType: set_func_native(function getEntriesByType(type) {
        console.log("getEntriesByType", type);
    }),
    onresourcetimingbufferfull: null,
});

window.performance = new Performance();
// ================================Performance End================================

// ================================EventTarget Start================================
// 1. 事件目标基类：EventTarget
createMockBrowserObject("EventTarget", {
    addEventListener: set_func_native(
        function addEventListener(type, callback) {
        },
    ),
    getAttribute: set_func_native(function getAttribute(type, callback) {
        console.log("getAttribute", type);
        if (type === "selenium" || type === "webdriver" || type === "driver") {
            return false;
        }
    }),
    getElementsByTagName: set_func_native(function getElementsByTagName(tagName) {
        console.log("getElementsByTagName", tagName);
        if (tagName === "*") {
            return watch(new HTMLCollection());
        }
    }),
});

createMockBrowserObject("Node", {}, "EventTarget");
createMockBrowserObject(
    "Element",
    {
        // "nodeType": 1,
        // "tagName": "",
    },
    "Node",
);

// ================================HTMLCollection Start================================
function makeHTMLCollectionProps() {
    let els = {};
    for (let index = 0; index < 10; index++) {
        els[index] = watch(new Element());
        els[index].tagName = index.toString();
    }
    return els;
}

createMockBrowserObject("HTMLCollection", {
    length: 10,
    ...makeHTMLCollectionProps(),
    [Symbol.iterator]: function () {
        let currentIndex = 0;
        const collection = this; // 保存当前集合的引用（避免 this 指向丢失）

        // 迭代器必须返回带有 next() 方法的对象
        return {
            next: function () {
                // 遍历结束：返回 done: true
                if (currentIndex >= collection.length) {
                    return {done: true};
                }
                // 未结束：返回当前元素，索引自增
                const value = collection[currentIndex];
                currentIndex++;
                return {done: false, value: value};
            },
        };
    },
    item: function (index) {
        // 原生规则：index 必须是有效的非负整数，否则返回 null
        // 1. 过滤非数字、负数、小数、超出长度的索引
        if (
            typeof index !== "number" ||
            index < 0 ||
            !Number.isInteger(index) ||
            index >= this.length
        ) {
            return null;
        }
        // 2. 有效索引：返回对应元素（与直接访问 collection[index] 效果一致）
        return this[index];
    },
});

createMockBrowserObject("HTMLAllCollection", {}, "HTMLCollection");

// ================================HTMLCollection End================================

createMockBrowserObject(
    "HTMLElement",
    {
        tagName: "HTML",
        setAttribute: set_func_native(function setAttribute(name, value) {
            console.log("setAttribute", name, value);
        }),
        href: "https://www.xiaohongshu.com/",
        protocol: "https:",
        host: "www.xiaohongshu.com",
        hostname: "www.xiaohongshu.com",
        port: "",
        pathname: "/explore",
        search: "",
        hash: "",
        getContext: set_func_native(function getContext(contextType) {
            console.log("getContext", contextType);
            return null;
        }),
        // querySelector: set_func_native(function querySelector(selector) {
        //   console.log("querySelector", selector);
        //   return null;
        // }),
        appendChild: set_func_native(function appendChild(child) {
            console.log("appendChild", child);
            return watch(new HTMLElement(), "HTMLHtmlElement.appendChild");
        }),
        nodeName: "div",
        style: {},
        offsetHeight: 1000,
        offsetWidth: 1000,
    },
    "Element",
);

createMockBrowserObject(
    "HTMLBodyElement",
    {
        tagName: "BODY",
        removeChild: set_func_native(function removeChild(child) {
            console.log("removeChild", child);
            return {};
        }),
    },
    "HTMLElement",
);

createMockBrowserObject(
    "HTMLHtmlElement",
    {
        tagName: "HTML",
    },
    "HTMLElement",
);

createMockBrowserObject(
    "Document",
    {
        //  要有 a1, 否则生成的长度不对
        // cookie: "",
        cookie:
            "abRequestId=9ad5d577-ccf7-5266-809e-d73c2b3c48a0; xsecappid=xhs-pc-web; a1=19bb1229c33kqri06jhjfmwl8xtj53ckmakkvxt1y30000752039; webId=3db6626e41caf5a59c4aa49566e5c142; gid=yjDDy42dyK6WyjDDyJJjS0C9qqTAF38KVxViTyv6E1YC9Tq8V2qSTh888W2J8qj80SDYS4j2; webBuild=5.7.0; unread={%22ub%22:%226948cf6d000000001b031f21%22%2C%22ue%22:%2269452742000000001f008081%22%2C%22uc%22:23}; websectiga=82e85efc5500b609ac1166aaf086ff8aa4261153a448ef0be5b17417e4512f28; loadts=1768287146078",
        location: window.location,
        documentElement: watch(new HTMLHtmlElement()),
        body: watch(new HTMLBodyElement()),
    },
    "Node",
);

createMockBrowserObject(
    "HTMLDocument",
    {
        all: watch(new HTMLAllCollection()),
        createElement: set_func_native(function createElement(tagName) {
            console.log("createElement", tagName);
            return watch(new HTMLElement(), "HTMLDocument.createElement");
        }),
        createEvent: set_func_native(function createEvent(type) {
            console.log("createEvent", type);
            return watch(new Event(type));
        }),
        querySelector: set_func_native(function querySelector(selector) {
            console.log("querySelector", selector);
            return watch(new HTMLElement(), "selector.HTMLElement");
        }),
        getElementById: set_func_native(function getElementById(id) {
            console.log("getElementById", id);
            return watch(new HTMLElement(), "id.HTMLElement");
        }),
    },
    "Document",
);

window.document = watch(new HTMLDocument());
watch(document, "document");
watch(location, "location");
watch(navigator, "navigator");
watch(screen, "screen");


debugger;
