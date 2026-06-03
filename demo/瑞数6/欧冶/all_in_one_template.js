meta_content = 'content_placeholder';
self = top = window = global;
window.setTimeout = function () {
}
window.setInterval = function () {
}
window.clearInterval = function () {
}
window.addEventListener = function () {
}
window.XMLHttpRequest = function () {
}
window.HTMLFormElement = function () {}

window.ActiveXObject = function ActiveXObject() {
}

div = {
    getElementsByTagName() {
        return []
    }
}
script = {

    getAttribute(attr) {
        if (attr === "r") {
            return "m"
        }
    },
    parentElement: {
        removeChild: function () {
        }
    }
}

meta = {
    content: meta_content,
    getAttribute(attr) {
        if (attr === "r") {
            return "m"
        }
    },
    parentNode: {
        removeChild: function () {
        }
    }

}

document = {
    createElement: function (ele) {
        console.log("document createElement", ele)
        if (ele === "div") {
            return div
        } else if (ele === "form") {
            return {
                getElementsByTagName: function () {
                    return []
                }
            }
        } else {
            return {}
        }
    },
    getElementsByTagName(ele) {
        console.log("document getElementsByTagName", ele)
        if (ele === "script") {
            return [script, script]
        }
        if (ele === "meta") {
            return [meta, meta]
        } else {
            return []
        }
    },


    appendChild: function () {
    },
    removeChild: function () {
    },
    documentElement: {
        addEventListener: function () {
        }
    },
    getElementById() {
        return {}
    }
}

location = {
    "ancestorOrigins": {},
    "href": "https://www.ouyeel.com/search-ng/queryResource/index",
    "origin": "https://www.ouyeel.com",
    "protocol": "https:",
    "host": "www.ouyeel.com",
    "hostname": "www.ouyeel.com",
    "port": "",
    "pathname": "/search-ng/queryResource/index",
    "search": "",
    "hash": ""
}

navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    webdriver: false
};

'ts_data';

'auto_js_data';

function get_cookie() {
    return document.cookie
}
