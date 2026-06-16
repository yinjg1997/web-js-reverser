const fs = require('fs');
const nodePath = require('path');
const vm = require('vm');
const {MD5, Hex} = require("crypto-js");

class XhsSign {
    constructor() {
        this.x0 = '4.3.5';
        this.x1 = "xhs-pc-web";
        this._initSandbox();
        this.PlatformCode = {
            0: "Windows",
            1: "iOS",
            2: "Android",
            3: "MacOs",
            4: "Linux",
            5: "other",
            Windows: 0,
            iOS: 1,
            Android: 2,
            MacOs: 3,
            Linux: 4,
            other: 5,
        };
        this.ALPHABET = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5";
    }

    _initSandbox() {
        this.sandbox = {
            // console,
            performance: require('perf_hooks').performance,
            TextEncoder: require('util').TextEncoder,
            Event: function Event() {
            },
        };
        vm.createContext(this.sandbox);
        let code = "";
        for (const f of ['./x-s/env.js', './x-s/mnsv2.js']) {
            code += "\n" + fs.readFileSync(nodePath.join(__dirname, f), 'utf8');
        }
        vm.runInContext(code, this.sandbox);
    }

    tripletToBase64(e) {
        var ALPHABET = this.ALPHABET;
        var u = [];
        var i = 0;
        while (i < ALPHABET.length) {
            u[i] = ALPHABET[i];
            i++;
        }
        return u[e >> 18 & 63] + u[e >> 12 & 63] + u[e >> 6 & 63] + u[63 & e];
    }

    encodeChunk(e, a, s) {
        var m = [];
        var w = a;
        while (w < s) {
            var chunk = (e[w] << 16 & 0xff0000) + (e[w + 1] << 8 & 65280) + (255 & e[w + 2]);
            m.push(this.tripletToBase64(chunk));
            w += 3;
        }
        return m.join("");
    }

    /**
     *
     * @param  {string} e 待编码的字符串
     * @returns {string}
     */
    crc32(e) {
        var s = [];
        var n = 0;
        while (n < 256) {
            var a = n;
            var m = 0;
            while (m < 8) {
                a = 1 & a ? 0xedb88320 ^ (a >>> 1) : a >>> 1;
                m++;
            }
            s[n] = a;
            n++;
        }
        var w = -1;
        var C = 0;
        while (C < e.length) {
            w = w >>> 8 ^ s[255 & (w ^ e.charCodeAt(C))];
            C++;
        }
        return (-1 ^ w) >>> 0;
    }


    /**
     *
     * @param  {string} e 待编码的字符串
     * @returns {string}
     */
    b64Encode(e) {
        var ALPHABET = this.ALPHABET;
        var u = [];
        var i = 0;
        while (i < ALPHABET.length) {
            u[i] = ALPHABET[i];
            i++;
        }

        var a;
        var s = e.length;
        var m = s % 3;
        var w = [];
        var C = 16383;
        var R = 0;
        var P = s - m;
        while (R < P) {
            w.push(this.encodeChunk(e, R, R + C > P ? P : R + C));
            R += C;
        }
        if (1 === m) {
            a = e[s - 1];
            w.push(u[a >> 2] + u[a << 4 & 63] + "==");
        } else if (2 === m) {
            a = (e[s - 2] << 8) + e[s - 1];
            w.push(u[a >> 10] + u[a >> 4 & 63] + u[a << 2 & 63] + "=");
        }
        return w.join("");
    }

    /**
     *
     * @param  {string} e 待编码的字符串或数组
     * @returns {string}
     */
    encodeUtf8(e) {
        for (var a = encodeURIComponent(e), s = [], u = 0; u < a.length; u++) {
            var m = a.charAt(u);
            if ("%" === m) {
                var w = parseInt(a.charAt(u + 1) + a.charAt(u + 2), 16);
                s.push(w),
                    u += 2
            } else
                s.push(m.charCodeAt(0))
        }
        return s
    }


    /**
     *
     * @param {string} e device
     * @returns {string}
     */
    getPlatformCode(e) {
        switch (e) {
            case "Android":
                return this.PlatformCode.Android;
            case "iOS":
                return this.PlatformCode.iOS;
            case "Mac OS":
                return this.PlatformCode.MacOs;
            case "Linux":
                return this.PlatformCode.Linux;
            default:
                return this.PlatformCode.other;
        }
    }

    _type_of(t) {
        return t && "undefined" != typeof Symbol && t.constructor === Symbol
            ? "symbol"
            : typeof t;
    }

    /**
     *
     * @param {number} e
     * @param {string} charset
     * @returns {string}
     */
    genRandomString(e, charset) {
        return Array(e)
            .fill(void 0)
            .map(function () {
                return charset[Math.floor(36 * Math.random())];
            })
            .join("");
    }

    /**
     *
     * @param {string} e PlatformCode "MacOs"
     * @returns {string} a1
     */
    generateLocalId(e) {
        let r = this.getPlatformCode(e),
            a = "000",
            c = ""
                .concat((+new Date()).toString(16))
                .concat(this.genRandomString(30, "abcdefghijklmnopqrstuvwxyz1234567890"))
                .concat(r)
                .concat("0")
                .concat(a),
            d = this.crc32(c);
        return "".concat(c).concat(d).substring(0, 52);
    }

    /**
     * 生成 xs, window.mnsv2 会用到 a1
     * @param {string} e 请求路径 "/api/sns/web/v1/login/activate"
     * @param {object} a 请求载呵 data
     * @param {string} a1 a1 a1
     * @returns {string}
     */
    get_xs(e, a, a1) {
        this.sandbox.document.cookie = `a1=${a1};`;

        var u = e;
        "[object Object]" === Object.prototype.toString.call(a) || "[object Array]" === Object.prototype.toString.call(a) || (void 0 === a ? "undefined" : this._type_of(a)) === "object" && null !== a ? u += JSON.stringify(a) : "string" == typeof a && (u += a);
        var m = MD5([u].join("")).toString(Hex);
        var w = MD5(e).toString(Hex);
        var C = this.sandbox.window.mnsv2(u, m, w);

        var P = {
            x0: this.x0,
            x1: this.x1,
            x2: 'Mac OS' || "PC",
            x3: C,
            x4: a ? (a === undefined ? "undefined" : this._type_of(a)) : ""
        };
        const xs = "XYS_" + this.b64Encode(this.encodeUtf8(JSON.stringify(P)))

        return xs
    }
}

xhs_sign = new XhsSign()
const path = "/api/sns/web/v1/login/activate"
const body = {}
const a1 = "19ece8e23e66re1y8nhmyw64sj7zzmcsmaqgzrr3n50000305328"
console.log(xhs_sign.get_xs(path, body, a1))