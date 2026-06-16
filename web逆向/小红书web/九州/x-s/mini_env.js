delete __filename
delete __dirname
!(() => {
    const origin_log = console.log;
    logToConsole = function () {
        return origin_log(...arguments)
    }
})();

//环境代理
function watch(obj, name) {
    // 用于存储已记录的操作，实现去重
    const loggedOperations = new Set();

    // 辅助函数：限制字符串长度，最长20个字符
    const truncateValue = (value) => {
        const str = String(value);
        return str.length > 20 ? str.substring(0, 20) + '...' : str;
    };

    return new Proxy(obj, {
        get: function (target, property) {
            const value = target[property];
            const type = typeof value;

            // 生成操作唯一标识和日志消息
            let operationId;
            let logMessage;
            // 处理要显示的值（截断处理）
            const displayValue = truncateValue(value);

            if (type === "symbol") {
                const symbolDescription = property.description || 'no description';
                logMessage = `对象=>${name},读取属性:${symbolDescription},这是一个 Symbol 类型的值`;
                operationId = `get:${name}:symbol:${symbolDescription}`;
            } else if (type === "function") {
                const functionName = value.name || 'anonymous';
                // 函数名也进行长度控制
                const displayFunctionName = truncateValue(functionName);
                logMessage = `对象=>${name},读取属性:${property.toString()},这是一个名为 ${displayFunctionName} 的函数`;
                operationId = `get:${name}:function:${property.toString()}:${functionName}`;
            } else {
                logMessage = `对象=>${name},读取属性:${String(property)},值为:${displayValue},类型为:${type}`;
                operationId = `get:${name}:${String(property)}:${type}:${String(value)}`;
            }

            // 检查是否已记录，如果没有则记录并输出
            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return value;
        },
        set: (target, property, newValue, receiver) => {
            const valueType = typeof newValue;

            // 生成操作唯一标识和日志消息
            let operationId;
            let logMessage;
            // 处理要显示的新值（截断处理）
            const displayNewValue = truncateValue(newValue);

            if (valueType === "symbol") {
                const symbolDescription = newValue.description || 'no description';
                logMessage = `对象=>${name},设置属性:${String(property)},这是一个 Symbol 类型的新值, 描述为: ${symbolDescription}`;
                operationId = `set:${name}:${String(property)}:symbol:${symbolDescription}`;
            } else {
                logMessage = `对象=>${name},设置属性:${String(property)},值为:${displayNewValue},类型为:${valueType}`;
                operationId = `set:${name}:${String(property)}:${valueType}:${String(newValue)}`;
            }

            // 检查是否已记录，如果没有则记录并输出
            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return Reflect.set(target, property, newValue, receiver);
        },
        // 监听 in 操作符（检查属性是否存在）
        has: (target, property) => {
            let operationId;
            let logMessage;

            // 处理 Symbol 类型的属性
            if (typeof property === 'symbol') {
                const symbolDescription = property.description || 'no description';
                logMessage = `对象=>${name},检查属性存在:${symbolDescription} (Symbol), 使用 in 操作符`;
                operationId = `has:${name}:symbol:${symbolDescription}`;
            } else {
                logMessage = `对象=>${name},检查属性存在:${String(property)}, 使用 in 操作符`;
                operationId = `has:${name}:${String(property)}`;
            }

            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return Reflect.has(target, property);
        },
        // 监听属性枚举操作（如 Object.keys、for...in 等）
        ownKeys: (target) => {
            const keys = Reflect.ownKeys(target);
            // 截断过长的键列表显示
            const displayKeys = truncateValue(keys.map(k =>
                typeof k === 'symbol' ? `Symbol(${k.description || ''})` : String(k)
            ).join(', '));

            const operationId = `ownKeys:${name}:${keys.length}`;
            const logMessage = `对象=>${name},枚举属性,共 ${keys.length} 个属性:${displayKeys}`;

            if (!loggedOperations.has(operationId)) {
                loggedOperations.add(operationId);
                logToConsole(logMessage);
            }

            return keys;
        },
        // ✅ 新增：拦截 getOwnPropertyDescriptor（检测 hasOwnProperty 和 Object.keys 等）
        getOwnPropertyDescriptor: (target, property) => {
            const descriptor = Reflect.getOwnPropertyDescriptor(target, property);

            if (descriptor) {
                console.log(`[原型链检测] ${name} 自身有属性: ${String(property)}`);
            } else {
                console.log(`[原型链检测] ${name} 自身没有属性: ${String(property)}，在原型链上`);
            }

            return descriptor;
        }
    });
}

//安全函数
const safeFunction = (function () {


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

    return function (func) {
        // ✅ 跳过原生构造函数
        var nativeConstructors = ['Error', 'RegExp', 'Date', 'Math', 'Function', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Symbol', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet'];
        if (nativeConstructors.indexOf(func.name) !== -1) {
            return func;
        }
        set_native(func, myFunction_toString_symbol, "function" + (func.name ? " " + func.name : "") + "() { [native code] }");
    }

})();

//类构造函数
function createConstructor(constructorName, enableStrictMode, propertiesList, prototypeMethods, parentConstructorName) {
    const instancesData = {};
    const constructorFunction = function (element, propertySetter, validationToken) {
        // ✅ 1. 先检测是否用 new 调用
        if (!(this instanceof constructorFunction)) {
            throw new TypeError("Failed to construct '" + constructorName + "': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
        }
        if (enableStrictMode && !(validationToken && validationToken === "fatdog")) {
            throw new TypeError("Illegal constructor");
        }

        // 为实例添加Symbol.toStringTag
        Object.defineProperty(this, Symbol.toStringTag, {
            value: constructorName,
            writable: false,
            enumerable: false,
            configurable: false
        });

        // 为实例添加Symbol.toPrimitive
        Object.defineProperty(this, Symbol.toPrimitive, {
            value: function (hint) {
                switch (hint) {
                    case 'number':
                        return this._element ? instancesData[this._element].toString().length : 0;
                    case 'string':
                        return `[${constructorName} Instance]`;
                    default:
                        return `[object ${constructorName}]`;
                }
            },
            writable: false,
            enumerable: false,
            configurable: false
        });

        if (propertySetter && typeof propertySetter === "function") {
            propertySetter(this, instancesData[this._element]);
        }
        const instanceProperties = element && typeof element === "object" ? element : {};
        this._element = Symbol("_element");
        instancesData[this._element] = instanceProperties;
        if (element && typeof element === "object") {
            Object.keys(element).forEach(key => {
                if (!this[key]) {
                    this[key] = element[key];
                }
            });
        }
    };

    // 设置构造函数名称
    Object.defineProperty(constructorFunction, 'name', {value: constructorName});

    // 处理继承关系
    if (parentConstructorName && window[parentConstructorName]) {
        const ParentConstructor = window[parentConstructorName];
        constructorFunction.prototype = Object.create(ParentConstructor.prototype);
        Object.defineProperty(constructorFunction.prototype, 'constructor', {
            value: constructorFunction,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }

    // 为构造函数本身添加Symbol.toStringTag
    Object.defineProperty(constructorFunction, Symbol.toStringTag, {
        value: constructorName,
        writable: false,
        enumerable: false,
        configurable: false
    });

    // 为构造函数本身添加Symbol.toPrimitive
    Object.defineProperty(constructorFunction, Symbol.toPrimitive, {
        value: function (hint) {
            switch (hint) {
                case 'number':
                    return constructorName.length;
                case 'string':
                    return `[Constructor ${constructorName}]`;
                default:
                    return constructorName;
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    // 添加原型方法
    Object.keys(prototypeMethods).forEach(methodName => {
        constructorFunction.prototype[methodName] = prototypeMethods[methodName];
        if (typeof constructorFunction.prototype[methodName] === "function") {
            safeFunction(constructorFunction.prototype[methodName]);
        }
    });

    // 保护构造函数
    safeFunction(constructorFunction);

    // 挂载到全局
    window[constructorName] = constructorFunction;
    return constructorFunction;
};

window = globalThis;
delete globalThis.navigator;
createConstructor('Permissions', true, [], {
    query: function (options) {
        // console.log('Permissions.query被调用————', options);
        return new Promise(function (resolve) {
            var status = new PermissionStatus({state: 'granted'}, null, 'fatdog');
            resolve(status);
        });
    }
});
createConstructor('PermissionStatus', true, ['state', 'onchange'], {
    addEventListener: function (type, listener) {
        console.log('PermissionStatus.addEventListener:', type);
    },
    removeEventListener: function (type, listener) {
        console.log('PermissionStatus.removeEventListener:', type);
    }
});
createConstructor('EventTarget', true, [], {
    addEventListener: function () {
    }
});
createConstructor('Node', true, [], {
    removeChild: function (child) {
        // console.log(`${this.tagName}删除了————`,child)
        // 不抛出错误，直接返回
        return child;
    },
    appendChild: function (child) {
        console.log('appendChild被调用————', child);
        if (!child || typeof child !== 'object' || !child.tagName) {
            throw new TypeError("Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.");
        }
        return child;
    },
    insertBefore: function (newChild, refChild) {
        console.log('insertBefore被调用————', newChild, refChild);
        if (!newChild || typeof newChild !== 'object' || !newChild.tagName) {
            throw new TypeError("Failed to execute 'insertBefore' on 'Node': parameter 1 is not of type 'Node'.");
        }
        return newChild;
    }
}, 'EventTarget');
createConstructor('WindowProperties', true, [], {}, 'EventTarget')
createConstructor('Window', true, [], {}, 'WindowProperties');
createConstructor('NavigatorUAData', true, [], {});

createConstructor('Navigator', true, [], {
    permissions: new Permissions({}, null, 'fatdog'),
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
    language: "zh-CN",
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver: false,
    platform: "Win32",
    languages: ['zh-CN', 'zh'],
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    userAgentData: new NavigatorUAData({
        "brands": [
            {
                "brand": "Chromium",
                "version": "148"
            },
            {
                "brand": "Google Chrome",
                "version": "148"
            },
            {
                "brand": "Not/A)Brand",
                "version": "99"
            }
        ],
        "mobile": false,
        "platform": "Windows"
    }, null, 'fatdog')
});
createConstructor('Screen', true, [], {
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1040,
    colorDepth: 24,
    pixelDepth: 24,
    availLeft: 0,
    availTop: 0,
    left: 0,
    top: 0
}, 'EventTarget');
createConstructor('History', true, [], {});
createConstructor('Location', true, [], {});

createConstructor('Element', true, [], {
    getAttribute: function (name) {
        // console.log("getAttribute读取",name)
    }
}, 'Node');
createConstructor('HTMLElement', true, [], {}, "Element");
createConstructor('HTMLHtmlElement', true, [], {}, "HTMLElement");
createConstructor('HTMLBodyElement', true, [], {}, "HTMLElement");
createConstructor('HTMLAllCollection', true, [], {});
createConstructor('Document', true, [], {
    evaluate: function (xpathExpression, contextNode, namespaceResolver, resultType, result) {
        // console.log('Document.evaluate被调用————',xpathExpression)
    },
    querySelectorAll: function (selectors) {
        // console.log('Document.querySelectorAll被调用————',selectors)
    },
    getElementsByTagName: function (tagname) {
        // console.log('getElementsByTagName获取————',tagname)
        const commonTags = [
            "html",
            "head",
            "script",
            "title",
            "meta",
            "link",
            "style",
            "iframe",
            "body",
            "div",
            "svg",
            "defs",
            "clippath",
            "rect",
            "path",
            "lineargradient",
            "stop",
            "symbol",
            "g",
            "mask",
            "circle",
            "header",
            "a",
            "img",
            "input",
            "use",
            "button",
            "span",
            "ul",
            "li",
            "p",
            "section"
        ];
        if (tagname === '*') {
            return {
                length: commonTags.length,
                [Symbol.iterator]: function* () {
                    for (const tagName of commonTags) {
                        yield {tagName: tagName.toUpperCase()};
                    }
                },
                item: function (i) {
                    return i >= 0 && i < commonTags.length
                        ? {tagName: commonTags[i].toUpperCase()}
                        : null;
                }
            };
        }
        return {
            length: 0, [Symbol.iterator]: function* () {
            }, item: () => null
        };
    },
    getElementById: function (id) {
        // console.log('getElementById获取id————',id)
    },
    cookie: 'abRequestId=c9f13ddc-ec96-5cf9-bd4f-86241206db2b; ets=1779843721483; xsecappid=xhs-pc-web; a1=19e66f3e962g9kl9q8uklkx2pkirzuq4n8ydrtry950000508806; webId=0b7fe9d8891ba0d9951af02054b791eb; gid=yjdKKiqfSqIjyjdKKiqdjY9FKJkjT1jAY7T1vvjTCJUT3f28Fu7A4F88828YY8K8f80yWfjd; webBuild=6.13.7; loadts=1780137853246; unread={%22ub%22:%2269f960c2000000001b022971%22%2C%22ue%22:%2269f417cd0000000035025c99%22%2C%22uc%22:32}; websectiga=82e85efc5500b609ac1166aaf086ff8aa4261153a448ef0be5b17417e4512f28; sec_poison_id=2e825055-a58e-4565-bbab-003def644616',
    all: new HTMLAllCollection({length: 1129}, null, 'fatdog'),
    body: new HTMLBodyElement({}, null, 'fatdog'),
    documentElement: new HTMLHtmlElement({
        getAttribute: function (name) {
            // console.log("getAttribute读取",name)
        }
    }, null, 'fatdog'),

}, 'Node');
createConstructor('HTMLDocument', true, [], {}, 'Document');
createConstructor('Storage', true, [], {
    getItem: function (key) {
        // console.log('localStorage.getItem获取', key);
        return this[key] || null;
    },
    setItem: function (key, value) {
        // console.log('localStorage.setItem设置', key, value);
        this[key] = String(value);
    },
    removeItem: function (key) {
        // console.log('localStorage.removeItem删除', key);
        if (this[key]) delete this[key];
    },
    clear: function () {
        this.__storage__ = {};
    }
});


createConstructor('XMLHttpRequestEventTarget', true, [], {}, 'EventTarget');
createConstructor('XMLHttpRequest', true, [], {
    open: function (method, url, async) {
        console.log('XHR.open:', method, url);
    },
    send: function (body) {
        console.log('XHR.send:', body);
    },
    setRequestHeader: function (key, value) {
        console.log('XHR.setRequestHeader:', key, value);
    },
    abort: function () {
    },
    getResponseHeader: function (key) {
        return null;
    },
    getAllResponseHeaders: function () {
        return '';
    },
    overrideMimeType: function () {
    },
}, 'XMLHttpRequestEventTarget');


window.window = window.self = window.top = window

Object.setPrototypeOf(window, Window.prototype);

location = new Location({
    protocol: 'https:',
    hash: "",
    host: "www.xiaohongshu.com",
    hostname: "www.xiaohongshu.com",
    href: "https://www.xiaohongshu.com/explore",
    origin: "https://www.xiaohongshu.com",
}, null, 'fatdog')
document = new HTMLDocument({
    querySelector: function (selectors) {
        console.log("querySelector被调用————", selectors)
    },

}, null, "fatdog")
navigator = new Navigator({}, null, "fatdog")
screen = new Screen({}, null, "fatdog")
history = new History({}, null, 'fatdog')
localStorage = new Storage({}, null, 'fatdog')

window.document = document
window.localStorage = localStorage

window.setInterval = function () {
}
window.setTimeout = function () {
}


// 清除 safeFunction 对原生构造函数的污染
var _sym = Symbol('('.concat('', ')'));
[Error, RegExp, Date, Function, Array, String, Number, Boolean, Promise, Map, Set, Symbol].forEach(function (c) {
    delete c[_sym];
});


window = watch(window, "window")