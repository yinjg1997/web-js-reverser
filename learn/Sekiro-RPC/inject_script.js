// fixme 先部署 Sekiro,
// # 下载镜像:
// docker pull registry.cn-beijing.aliyuncs.com/iinti/common:sekiro-all-in-one-latest
// # 启动sekiro服务器
// docker run -d -p 5612:5612 -v ~/sekiro-mysql-data:/var/lib/mysql --name sekiro-all-in-one registry.cn-beijing.aliyuncs.com/iinti/common:sekiro-all-in-one-latest

// ====================复制的固定代码 start ===========================
function SekiroClient(wsURL) {
    this.wsURL = wsURL;
    this.handlers = {};
    this.socket = {};
    // check
    if (!wsURL) {
        throw new Error('wsURL can not be empty!!')
    }
    this.webSocketFactory = this.resolveWebSocketFactory();
    this.connect()
}

SekiroClient.prototype.resolveWebSocketFactory = function () {
    if (typeof window === 'object') {
        var theWebSocket = window.WebSocket ? window.WebSocket : window.MozWebSocket;
        return function (wsURL) {

            function WindowWebSocketWrapper(wsURL) {
                this.mSocket = new theWebSocket(wsURL);
            }

            WindowWebSocketWrapper.prototype.close = function () {
                this.mSocket.close();
            };

            WindowWebSocketWrapper.prototype.onmessage = function (onMessageFunction) {
                this.mSocket.onmessage = onMessageFunction;
            };

            WindowWebSocketWrapper.prototype.onopen = function (onOpenFunction) {
                this.mSocket.onopen = onOpenFunction;
            };
            WindowWebSocketWrapper.prototype.onclose = function (onCloseFunction) {
                this.mSocket.onclose = onCloseFunction;
            };

            WindowWebSocketWrapper.prototype.send = function (message) {
                this.mSocket.send(message);
            };

            return new WindowWebSocketWrapper(wsURL);
        }
    }
    if (typeof weex === 'object') {
        // this is weex env : https://weex.apache.org/zh/docs/modules/websockets.html
        try {
            console.log("test webSocket for weex");
            var ws = weex.requireModule('webSocket');
            console.log("find webSocket for weex:" + ws);
            return function (wsURL) {
                try {
                    ws.close();
                } catch (e) {
                }
                ws.WebSocket(wsURL, '');
                return ws;
            }
        } catch (e) {
            console.log(e);
            //ignore
        }
    }
    //TODO support ReactNative
    if (typeof WebSocket === 'object') {
        return function (wsURL) {
            return new theWebSocket(wsURL);
        }
    }
    // weex 鍜  PC鐜鐨剋ebsocket API涓嶅畬鍏ㄤ竴鑷达紝鎵€浠ュ仛浜嗘娊璞″吋瀹 
    throw new Error("the js environment do not support websocket");
};

SekiroClient.prototype.connect = function () {
    console.log('sekiro: begin of connect to wsURL: ' + this.wsURL);
    var _this = this;
    // 涓峜heck close锛岃
    // if (this.socket && this.socket.readyState === 1) {
    //     this.socket.close();
    // }
    try {
        this.socket = this.webSocketFactory(this.wsURL);
    } catch (e) {
        console.log("sekiro: create connection failed,reconnect after 2s");
        setTimeout(function () {
            _this.connect()
        }, 2000)
    }

    this.socket.onmessage(function (event) {
        _this.handleSekiroRequest(event.data)
    });

    this.socket.onopen(function (event) {
        console.log('sekiro: open a sekiro client connection')
    });

    this.socket.onclose(function (event) {
        console.log('sekiro: disconnected ,reconnection after 2s');
        setTimeout(function () {
            _this.connect()
        }, 2000)
    });
};

SekiroClient.prototype.handleSekiroRequest = function (requestJson) {
    console.log("receive sekiro request: " + requestJson);
    var request = JSON.parse(requestJson);
    var seq = request['__sekiro_seq__'];

    if (!request['action']) {
        this.sendFailed(seq, 'need request param {action}');
        return
    }
    var action = request['action'];
    if (!this.handlers[action]) {
        this.sendFailed(seq, 'no action handler: ' + action + ' defined');
        return
    }

    var theHandler = this.handlers[action];
    var _this = this;
    try {
        theHandler(request, function (response) {
            try {
                _this.sendSuccess(seq, response)
            } catch (e) {
                _this.sendFailed(seq, "e:" + e);
            }
        }, function (errorMessage) {
            _this.sendFailed(seq, errorMessage)
        })
    } catch (e) {
        console.log("error: " + e);
        _this.sendFailed(seq, ":" + e);
    }
};

SekiroClient.prototype.sendSuccess = function (seq, response) {
    var responseJson;
    if (typeof response == 'string') {
        try {
            responseJson = JSON.parse(response);
        } catch (e) {
            responseJson = {};
            responseJson['data'] = response;
        }
    } else if (typeof response == 'object') {
        responseJson = response;
    } else {
        responseJson = {};
        responseJson['data'] = response;
    }


    if (Array.isArray(responseJson)) {
        responseJson = {
            data: responseJson,
            code: 0
        }
    }

    if (responseJson['code']) {
        responseJson['code'] = 0;
    } else if (responseJson['status']) {
        responseJson['status'] = 0;
    } else {
        responseJson['status'] = 0;
    }
    responseJson['__sekiro_seq__'] = seq;
    var responseText = JSON.stringify(responseJson);
    console.log("response :" + responseText);
    this.socket.send(responseText);
};

SekiroClient.prototype.sendFailed = function (seq, errorMessage) {
    if (typeof errorMessage != 'string') {
        errorMessage = JSON.stringify(errorMessage);
    }
    var responseJson = {};
    responseJson['message'] = errorMessage;
    responseJson['status'] = -1;
    responseJson['__sekiro_seq__'] = seq;
    var responseText = JSON.stringify(responseJson);
    console.log("sekiro: response :" + responseText);
    this.socket.send(responseText)
};

SekiroClient.prototype.registerAction = function (action, handler) {
    if (typeof action !== 'string') {
        throw new Error("an action must be string");
    }
    if (typeof handler !== 'function') {
        throw new Error("a handler must be function");
    }
    console.log("sekiro: register action: " + action);
    this.handlers[action] = handler;
    return this;
};

// ====================复制的固定代码 end ===========================
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// fixme 服务器ip;
// group=ws-group 分组配置;
// client id 可以用设备id
var client = new SekiroClient("ws://127.0.0.1:5612/business/register?group=ws-group&clientId=" + guid());

// fixme 注册一个名为 clientTime 的服务
client.registerAction("clientTime", function (request, resolve, reject) {
    // fixme resolve的值在返回时会放在 data 字段中
    resolve("客户端时间: " + new Date());
});

// fixme 注册一个名为 executeJs 的服务
client.registerAction("executeJs", function (request, resolve, reject) {
    /**
     *  // fixme request：外部调用时传入的参数（比如过滤条件、请求数据）
     *   // resolve：成功回调，把结果返回给调用者
     *   // reject：失败回调，返回错误信息
     */
    const code = request["code"]; // 接收传递的参数
    if (!code) {
        reject("need param{code}");
        return;
    }
    console.log(`executeJs：${code}`);
    try {
        const result = document.cookie; // 获取页面cookie
        resolve(result); // 将cookie传递出去
    } catch (e) {
        reject(`error:${e}`); // 异常处理
    }
})