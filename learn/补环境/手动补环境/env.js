window = self = top = global;
localStorage = {
    getItem(key) {
        return ""
    }
}
window.localStorage = {}
window.addEventListener = function addEventListener(){}
head = {}
cookie = {}
document = {
    head: head,
    getElementsByTagName(tag_name) {
        console.log("document getElementsByTagName: ", tag_name);

        if (tag_name === "head") {
            return [head]
        } else if (tag_name === "meta") {
            return [meta, meta]
        } else if (tag_name === "base") {
            return []
        }
        return []
    },
    createElement(tag_name) {
        console.log("document createElement: ", tag_name);
        if (tag_name === "meta") {
            return meta
        } else if (tag_name === "base") {
            return base
        }
        return {}
    },
    addEventListener(type, listener) {
    },
    cookie: cookie,
}

location = {
    "ancestorOrigins": {},
    "href": "https://q.10jqka.com.cn/",
    "origin": "https://q.10jqka.com.cn",
    "protocol": "https:",
    "host": "q.10jqka.com.cn",
    "hostname": "q.10jqka.com.cn",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
}

navigator = {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    javaEnabled() {
        return false
    }
}

function getEnv(proxy_array) {
    for(let i=0; i<proxy_array.length; i++){
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
const proxy_array = ['window','document','locaion', 'navigator', 'localStorage', 'cookie', 'head']
getEnv(proxy_array);