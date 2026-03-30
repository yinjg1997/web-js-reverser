let setProxyArr = function (proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        // 模板字符串使用多行模板字面量，用 ${} 直接嵌入变量，避免冗余拼接
        const handler = `{
  get: function(target, property, receiver) {
    console.log(
      "对象:", "${proxyObjArr[i]}",
      "方法:", "\x1B[32m[GET]\x1B[0m",
      "属性名:", property,
      "属性名类型:", typeof property,
      "\x1B[33m属性值:\x1B[0m", target[property],
      "属性值类型:", typeof target[property]
    );
    return Reflect.get(...arguments);
  },
  set: function(target, property, value, receiver) {
    console.log(
      "对象:", "${proxyObjArr[i]}",
      "方法:", "\x1B[31m[SET]\x1B[0m",
      "属性名:", property,
      //"新属性值:", value,
      "新属性值类型:", typeof value,
      "旧属性值:", target[property],
      "旧属性值类型:", typeof target[property],
    );
    return Reflect.set(...arguments);
  }
}`;
        eval(`try {
            ${proxyObjArr[i]};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        } catch (e) {
            ${proxyObjArr[i]} = {};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        }`);
    }
}

function watch(object) {
    const handler = {
        get: function (target, property, receiver) {
            if (property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON') {
                console.log(
                  "对象:", object,
                  "方法:", "\x1B[32m[GET]\x1B[0m",
                  "属性名:", property,
                  "属性名类型:", typeof property,
                  "\x1B[33m属性值:\x1B[0m", target[property],
                  "属性值类型:", typeof target[property]
                )
            }
            return Reflect.get(...arguments)

        },
        set: function (target, property, value, receiver) {
               console.log(
                  "对象:", object,
                  "方法:", "\x1B[31m[SET]\x1B[0m",
                  "属性名:", property,
                  //"新属性值:", value,
                  "新属性值类型:", typeof value,
                  "旧属性值:", target[property],
                  "旧属性值类型:", typeof target[property],
               );
            return Reflect.set(...arguments);
        }
    }
    // return object
    return new Proxy(object, handler)
}

const set_func_native = function (func) {
    //处理安全函数
    Function.prototype.$call = Function.prototype.call;
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')'));

    const myToString = function myToString() {
        return typeof this === 'function' && this[myFunction_toString_symbol] || $toString.$call(this);
    }

    const set_native = function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        });
    }

    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", myToString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");

    const safe_Function = function safe_Function(func) {
        set_native(func, myFunction_toString_symbol, "function" + (func.name ? " " + func.name : "") + "() { [native code] }");
        return func
    }

    return safe_Function(func)
}
// ================================ XMLHttpRequest ==================
function XMLHttpRequest() {

}
XMLHttpRequest.prototype = {
    open: function open() {},
    send: function send() {},
    setRequestHeader: function setRequestHeader() {},
    addEventListener: function addEventListener() {},
}

set_func_native(XMLHttpRequest);
// ====Window Start====
window = globalThis;
window.top = window.window = window.self = window
window.Buffer = Buffer
delete global
delete Buffer
delete __dirname
delete __filename
delete process
delete globalThis.navigator;

Object.defineProperties(window, {
    [Symbol.toStringTag]: {
        value: "window",    // 属性值：使 window.toString() 结果包含 "[object window]"
        configurable: true
    }
});

function Window() {
    throw new TypeError("Illegal constructor");
}
Window.prototype = {
    constructor: Window,
    setTimeout: set_func_native(function setTimeout(x, y) {
        // x可能是方法也可能是文本
        typeof (x) == "function" ? x() : undefined;
        typeof (x) == "string" ? eval(x) : undefined;
        // 正确应该 生成UUID，并且保存到内存
        return 123;
    }),
    setInterval: set_func_native(function setInterval(x, y) {
        // x可能是方法也可能是文本
        typeof (x) == "function" ? x() : undefined;
        typeof (x) == "string" ? eval(x) : undefined;
        // 正确应该 生成UUID，并且保存到内存
        return 123;
    }),
    clearTimeout: set_func_native(function clearTimeout(x, y) {}),
    DeviceMotionEvent: set_func_native(function DeviceMotionEvent() {
        debugger
    }),
    DeviceOrientationEvent: set_func_native(function DeviceOrientationEvent() {
        debugger
    }),
    addEventListener: set_func_native(function addEventListener(type, listener, options) {
        // debugger
    }),
    MouseEvent: set_func_native(function MouseEvent(type, listener, options) {
    }),
    requestAnimationFrame: set_func_native(function requestAnimationFrame(x, y) {}),
    requestIdleCallback: set_func_native(function requestIdleCallback(x, y) {}),
    XMLHttpRequest: XMLHttpRequest,
}
set_func_native(Window);

Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true
    }
})

Object.setPrototypeOf(window, Window.prototype)
// 赋值空对象最好使用这种class chrome{} 形式，而不是 {},因为这样我们可以看名字，并且最好挂上代理
window.chrome = watch({})
window.opr = undefined
window.mozInnerScreenY = undefined
window.safari = undefined
window.StyleMedia = undefined
window.loadts = Date.now().toString()
window.__wxjs_environment = undefined
window.__wxWebEnv = undefined
window.__wxjs_is_wkwebview = undefined

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

// ============================Navigator Start================================
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
set_func_native(Navigator);
Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true
    }
})

navigator = new Navigator()
Object.setPrototypeOf(navigator, Navigator.prototype)
window.navigator = navigator;
window.Navigator = Navigator;

// ============================Navigator End================================

// ================================Screen Start================================
function Screen() {
    this.width = 1920;
    this.height = 1080;
    this.availWidth = 1440;
    this.availHeight = 900;
    this.colorDepth = 24;
    this.pixelDepth = 24;
}

set_func_native(Screen);

Screen.prototype = {
    constructor: Screen,
    width: 1920,
    height: 1080,
}
Object.defineProperties(Screen.prototype, {
    [Symbol.toStringTag]: {
        value: "Screen",
        configurable: true
    }
})

screen = new Screen();
Object.setPrototypeOf(screen, Screen.prototype)
window.screen = screen;
window.Screen = Screen;
// ================================Screen End================================


// ================================Location Start================================
function Location() {
}

set_func_native(Location);

Location.prototype = {
    constructor: Location,
    href: "https://www.xiaohongshu.com/",
    protocol: "https:",
    host: "www.xiaohongshu.com",
    hostname: "www.xiaohongshu.com",
    port: "",
    pathname: "/explore",
    search: "",
    hash: "",
}
Object.defineProperties(Location.prototype, {
    [Symbol.toStringTag]: {
        value: "Location",
        configurable: true
    }
})

location = new Location();
Object.setPrototypeOf(location, Location.prototype)
window.location = location;
window.Location = Location;
// ================================Location End================================

// ================================Performance Start================================
function Performance() {
}

set_func_native(Performance);

Performance.prototype = {
    constructor: Performance,
    now: set_func_native(function now() {
        return new Date();
    }),
    getEntriesByType: set_func_native(function getEntriesByType(type) {
        console.log("getEntriesByType", type);
    }),
    onresourcetimingbufferfull: null
}
Object.defineProperties(Performance.prototype, {
    [Symbol.toStringTag]: {
        value: "Performance",
        configurable: true
    }
})

performance = new Performance();
Object.setPrototypeOf(performance, Performance.prototype)
window.performance = performance;
window.Performance = Performance;
// ================================Performance End================================

// ================================HTMLCollection Start================================
function HTMLCollection() {
    for (let index = 0; index < 10; index++) {
        this[index] = new Element(); // 每个索引位置创建一个 Element 实例
        this[index].tagName = index.toString(); // 给实例设置 tagName（用索引字符串标识）
    }
    this.length = 10; // 集合长度为 10
}

HTMLCollection.prototype = {
    constructor: HTMLCollection,
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
            }
        };
    },
    item: function (index) {
        // 原生规则：index 必须是有效的非负整数，否则返回 null
        // 1. 过滤非数字、负数、小数、超出长度的索引
        if (typeof index !== 'number' || index < 0 || !Number.isInteger(index) || index >= this.length) {
            return null;
        }
        // 2. 有效索引：返回对应元素（与直接访问 collection[index] 效果一致）
        return this[index];
    }
};
set_func_native(HTMLCollection);
Object.defineProperties(HTMLCollection.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLCollection",
        configurable: true
    }
})

function HTMLAllCollection() {
    HTMLCollection.call(this); // 调用父类构造函数，继承父类的实例属性和逻辑
}

// 原型继承：
HTMLAllCollection.prototype = Object.create(HTMLCollection.prototype);
HTMLAllCollection.prototype.constructor = HTMLAllCollection;
set_func_native(HTMLAllCollection);
Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLAllCollection",
        configurable: true
    }
})
window.HTMLAllCollection = HTMLAllCollection;
// ================================HTMLCollection End================================


// ================================EventTarget Start================================
// 1. 事件目标基类：EventTarget
function EventTarget() {
}

EventTarget.prototype = {
    constructor: EventTarget,
    addEventListener: set_func_native(function addEventListener(type, callback) {
    }),
    getAttribute: set_func_native(function getAttribute(type, callback) {
        console.log("getAttribute", type, callback);
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
    all: watch(new HTMLAllCollection())
};
set_func_native(EventTarget);
Object.defineProperties(EventTarget.prototype, {
    [Symbol.toStringTag]: {
        value: "EventTarget",
        configurable: true
    }
})
window.EventTarget = EventTarget;

// 2. 节点基类：Node（继承 EventTarget）
function Node() {
    EventTarget.call(this);
}

// fixme 实例原型链继承, 原型链继承的核心—— 子类实例继承父类的原型方法，
Node.prototype = Object.create(EventTarget.prototype);
Node.prototype.constructor = Node; // 重置构造函数指向
set_func_native(Node);
Object.defineProperties(Node.prototype, {
    [Symbol.toStringTag]: {
        value: "Node",
        configurable: true
    }
})

// 3. 元素基类：Element（继承 Node）
function Element() {
    Node.call(this); // 构造函数继承
    this.nodeType = 1; // 元素节点类型（HTML 规范）
    this.tagName = ""; // 初始化标签名
}

Element.prototype = Object.create(Node.prototype); // 原型链继承
Element.prototype.constructor = Element; // 重置构造函数指向
set_func_native(Element);
Object.defineProperties(Element.prototype, {
    [Symbol.toStringTag]: {
        value: "Element",
        configurable: true
    }
})
window.Element = Element;

// 4. HTML 元素基类：HTMLElement（继承 Element）
function HTMLElement() {
    Element.call(this); // 构造函数继承
    this.tagName = "HTML"; // 标识为 <html> 标签基类
}

HTMLElement.prototype = Object.create(Element.prototype); // 原型链继承
HTMLElement.prototype.constructor = HTMLElement; // 重置构造函数指向
set_func_native(HTMLElement);
Object.defineProperties(HTMLElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLElement",
        configurable: true
    }
})
window.HTMLElement = HTMLElement;

function HTMLBodyElement() {
    HTMLElement.call(this); // 构造函数继承
    this.tagName = "BODY"; // 标识为 <body> 标签基类
    this.removeChild = set_func_native(function removeChild(child) {
        console.log("removeChild", child);
    });
}

HTMLBodyElement.prototype = Object.create(HTMLElement.prototype); // 原型链继承
HTMLBodyElement.prototype.constructor = HTMLBodyElement; // 重置构造函数指向
set_func_native(HTMLBodyElement);
Object.defineProperties(HTMLBodyElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLBodyElement",
        configurable: true
    }
})
window.HTMLBodyElement = HTMLBodyElement;

// 5. <html> 元素专属类：HTMLHtmlElement（继承 HTMLElement）
function HTMLHtmlElement() {
    HTMLElement.call(this); // 构造函数继承
}

HTMLHtmlElement.prototype = Object.create(HTMLElement.prototype); // 原型链继承
HTMLHtmlElement.prototype.constructor = HTMLHtmlElement; // 重置构造函数指向
set_func_native(HTMLHtmlElement);
Object.defineProperties(HTMLHtmlElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLHtmlElement",
        configurable: true
    }
})
window.HTMLHtmlElement = HTMLHtmlElement;

// 1. Document 构造函数（继承 Node）
function Document() {
    Node.call(this); // 构造函数继承 Node
    this.cookie = 'a1=19a9b67d6167job51m1c1sthi8npprkollady20xc30000351812; webId=578817fe5bbb8b7e3e0a4c88df476469; gid=yj0jDKWiJS1fyj0jDKWfK1J8yKWVlD2y6ySy0CSM9x3YIfq8UUFTlv888q2yYyJ8YfK04WK2; abRequestId=578817fe5bbb8b7e3e0a4c88df476469; webBuild=4.86.0; xsecappid=xhs-pc-web; loadts=1763543885232; unread={%22ub%22:%2264c7b2220000000017019d6d%22%2C%22ue%22:%226468f3af000000001303e5aa%22%2C%22uc%22:21}; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=c9944b64-b512-407d-865b-3e574baf8b8b';
    this.location = window.location;
    this.documentElement = watch(new HTMLHtmlElement()); // 关联 <html> 元素
    this.body = watch(new HTMLBodyElement());
}

Document.prototype = Object.create(Node.prototype); // 原型链继承 Node
set_func_native(Document);
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true
    }
})
Document.prototype.constructor = Document;
// Document.prototype.Symbol.toStringTag = "Document";
window.Document = Document;

// 2. HTMLDocument 构造函数（继承 Document）
function HTMLDocument() {
    Document.call(this); // 构造函数继承 Document
}

HTMLDocument.prototype = Object.create(Document.prototype); // 原型链继承 Document
set_func_native(HTMLDocument);
Object.defineProperties(HTMLDocument.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLDocument",
        configurable: true
    }
})
HTMLDocument.prototype.constructor = HTMLDocument;
window.HTMLDocument = HTMLDocument;
window.document = new HTMLDocument();




setProxyArr(['window', 'document', 'location', 'navigator', 'screen']);

debugger;

console.log(window.navigator)
