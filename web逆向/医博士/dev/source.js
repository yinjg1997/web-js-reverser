function c(t, e, r) {
    /**
     * t: 移动坐标{x,y}
     * e: 验证码类型 2key
     * r: secretKey 变化的 从 get 请求拿到的 secretKey, token
     */
    var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "SM";
    if ("SM" == a) {
        if ("3nokey" == e || "3key" == e) {
            var c = o(t);
            return c
        }
        if ("2nokey" == e || "2key" == e) {
            var u = i(t);
            return u
        }
        if (32 == e) {
            var f = n(t);
            return f
        }
    } else if ("NSM" == a) {
        if (32 == e || "2nokey" == e || "3nokey" == e) {
            var l = Object(s.b)(t);
            return l
        }
        if ("3key" == e || "2key" == e) {
            var p = Object(s.a)(t, r);
            return p
        }
    }
}

const end = function () {
    var t = this;
    this.endMovetime = +new Date;
    var e = this;
    if (this.status && 0 == this.isEnd) {
        var r = parseInt((this.moveBlockLeft || "").replace("px", ""));
        r = 310 * r / parseInt(this.setSize.imgWidth),
            f({
                captchaType: this.captchaType, // blockPuzzle
                pointJson: this.secretKey ? Object(l.b)(JSON.stringify({
                    x: r,
                    y: 5
                }), l.a.sm2key, this.secretKey) : JSON.stringify({
                    x: r,
                    y: 5
                }),
                token: this.backToken
            }).then((function (n) {
                if ("0000" == n.repCode) {
                    t.moveBlockBackgroundColor = "#5cb85c",
                        t.leftBarBorderColor = "#5cb85c",
                        t.iconColor = "#fff",
                        t.iconClass = "icon-check",
                        t.showRefresh = !1,
                        t.isEnd = !0,
                        "pop" == t.mode && setTimeout((function () {
                            t.$parent.clickShow = !1,
                                t.refresh()
                        }
                        ), 1500),
                        t.passFlag = !0,
                        t.tipWords = "".concat(((t.endMovetime - t.startMoveTime) / 1e3).toFixed(2), "s验证成功");
                    var o = t.secretKey ? Object(l.b)(t.backToken + "---" + JSON.stringify({
                        x: r,
                        y: 5
                    }), l.a.sm3key, t.secretKey) : t.backToken + "---" + JSON.stringify({
                        x: r,
                        y: 5
                    });
                    setTimeout((function () {
                        t.tipWords = "",
                            t.$parent.closeBox(),
                            t.$parent.$emit("success", {
                                captchaVerification: o
                            })
                    }
                    ), 1e3)
                } else
                    t.moveBlockBackgroundColor = "#d9534f",
                        t.leftBarBorderColor = "#d9534f",
                        t.iconColor = "#fff",
                        t.iconClass = "icon-close",
                        t.passFlag = !1,
                        setTimeout((function () {
                            e.refresh()
                        }
                        ), 1e3),
                        t.$parent.$emit("error", t),
                        t.tipWords = "验证失败",
                        setTimeout((function () {
                            t.tipWords = ""
                        }
                        ), 1e3)
            }
            )),
            this.status = !1
    }
}