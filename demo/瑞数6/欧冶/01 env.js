meta_content = "OmQpfHsE1u8wp0OHm6wP94QS0hMTB4k4l6rdg4XSaidsBZw0.dHL2dA68ltCtLy0aT_kJYv1qzNRbOg8UozrkpUbgU2QCx7jU2UxrlR33AzgIvoqpS19iIU0hacWhtOWyUGCft3YEbC6UUMvxN7XYPEcAi8NNkUoNH9eQHZnafJFJmIyHCiORG"
window = self = top = global;
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
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    webdriver: false
}

div = {
    getElementsByTagName(tag_name) {
        return []
    },
    // innerHTML(){}
}

head = {
    removeChild() {

    }
}
script = {
    getAttribute(attr) {

        if (attr === "r") {
            return "m"
        }
        return ""
    },
    parentElement: head
}

meta = {
    getAttribute(attr) {
        console.log('meta attr: ', attr);
        if (attr === 'r') {
            return "m"
        } 
        return ""
    },
    parentNode: head,
    content: meta_content
}

document = {
    createElement(ele) {

        if (ele === "div") {
            return div
        }
        return {}
    },
    appendChild() { },
    removeChild() { },
    getElementsByTagName(tag_name) {
        console.log("document getElementsByTagName: ", tag_name);

        if (tag_name === "script") {
            return [script, script]
        } else if (tag_name === "meta") {
            return [meta, meta]
        } else if (tag_name === "base") {
            return []
        } 
        return []
    },
    getElementById(id){
        console.log("document getElementById: ", id);
        if (id === 'root-hammerhead-shadow-ui'){
            return {}
        }
        return {}
    }
}

location = {
    "ancestorOrigins": {},
    "href": "https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50",
    "origin": "https://www.ouyeel.com",
    "protocol": "https:",
    "host": "www.ouyeel.com",
    "hostname": "www.ouyeel.com",
    "port": "",
    "pathname": "/steel/search",
    "search": "?pageIndex=0&pageSize=50",
    "hash": ""
}

// navigator = {
//     appCodeName: "Mozilla",
//     appName: "Netscape",
//     appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
//     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
//     webdriver: false
// }

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
            try{
                ${proxy_array[i]};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]},${handler});
            }catch(e){
                ${proxy_array[i]}={};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]},${handler});
            }
        `);
    }
}
// fixme 每写一个全局对象, 就在这里加一个
const proxy_array = ['window', 'document', 'div', 'script', 'meta']
getEnv(proxy_array);