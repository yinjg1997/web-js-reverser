// ================================EventTarget Body Document Start================================
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
    }),

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
    // fixme 这一行的目的：让 Node 的实例继承 EventTarget 的实例属性。
    EventTarget.call(this);
}

// fixme 这一行的目的：让 Node 的实例继承 EventTarget 的原型方法。
Node.prototype = Object.create(EventTarget.prototype);
Node.prototype.constructor = Node; // 重置构造函数指向
set_func_native(Node);
Object.defineProperties(Node.prototype, {
    [Symbol.toStringTag]: {
        value: "Node",
        configurable: true
    }
})

function Element() {
    Node.call(this);
    this.nodeType = 1;
    this.tagName = "";
}

Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;
set_func_native(Element);
Object.defineProperties(Element.prototype, {
    [Symbol.toStringTag]: {
        value: "Element",
        configurable: true
    }
})
window.Element = Element;

function HTMLElement() {
    Element.call(this);
    this.tagName = "HTML";
}

HTMLElement.prototype = Object.create(Element.prototype);
HTMLElement.prototype.constructor = HTMLElement;
set_func_native(HTMLElement);
Object.defineProperties(HTMLElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLElement",
        configurable: true
    }
})
window.HTMLElement = HTMLElement;

function HTMLBodyElement() {
    HTMLElement.call(this);
    this.tagName = "BODY";
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

// ================================Document Start================================
function Document() {
    Node.call(this); // 构造函数继承 Node
    this.cookie = 'a1=19a9b67d6167job51m1c1sthi8npprkollady20xc30000351812; webId=578817fe5bbb8b7e3e0a4c88df476469; gid=yj0jDKWiJS1fyj0jDKWfK1J8yKWVlD2y6ySy0CSM9x3YIfq8UUFTlv888q2yYyJ8YfK04WK2; abRequestId=578817fe5bbb8b7e3e0a4c88df476469; webBuild=4.86.0; xsecappid=xhs-pc-web; loadts=1763543885232; unread={%22ub%22:%2264c7b2220000000017019d6d%22%2C%22ue%22:%226468f3af000000001303e5aa%22%2C%22uc%22:21}; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=c9944b64-b512-407d-865b-3e574baf8b8b';
    this.location = window.location;
    this.documentElement = watch(new HTMLHtmlElement());
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
window.Document = Document;

function HTMLDocument() {
    Document.call(this);
}

HTMLDocument.prototype = Object.create(Document.prototype);
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
// ================================Document End================================
// ========================================EventTarget Body Document End====================================
