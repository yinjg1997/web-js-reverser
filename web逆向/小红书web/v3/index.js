/**
 * 生成链:
 * x-s 依赖 a1 生成
 * x-s-common 依赖 xs, a1, b1, loadts
 * web-session 依赖 x-s, xs-common, a1, webId, loadts
 * web-session + x-s + x-s-common 进行 homefeed 请求
 *
 * x-s 搜 seccore_signv2
 */
require("./env.js");
require("./mnsv2.js");
require("./fp.js");
const reverseTool = require("./encode_help.js");


const PlatformCode = {
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

function getPlatformCode(e) {
    switch (e) {
        case "Android":
            return PlatformCode.Android;
        case "iOS":
            return PlatformCode.iOS;
        case "Mac OS":
            return PlatformCode.MacOs;
        case "Linux":
            return PlatformCode.Linux;
        default:
            return PlatformCode.other;
    }
}

// =============== a1 ==================
function get_a1(e) {

    var CHARSET = "abcdefghijklmnopqrstuvwxyz1234567890";

    function genRandomString(e) {
        return Array(e)
            .fill(void 0)
            .map(function () {
                return CHARSET[Math.floor(36 * Math.random())];
            })
            .join("");
    }

    function crc32(e) {
        var crcTable = [];
        var c = 0;
        while (c < 256) {
            var r = c;
            var d = 0;
            while (d < 8) {
                r = 1 & r ? 0xedb88320 ^ (r >>> 1) : r >>> 1;
                d++;
            }
            crcTable[c] = r;
            c++;
        }
        var s = -1;
        var u = 0;
        while (u < e.length) {
            s = (s >>> 8) ^ crcTable[255 & (s ^ e.charCodeAt(u))];
            u++;
        }
        return (-1 ^ s) >>> 0;
    }

    /**
     *
     * @param {*} e “Mac OS”
     * @returns
     */
    function generateLocalId(e) {
        var r = getPlatformCode(e),
            a = "000",
            c = ""
                .concat((+new Date()).toString(16))
                .concat(genRandomString(30))
                .concat(r)
                .concat("0")
                .concat(a),
            d = crc32(c);
        return "".concat(c).concat(d).substring(0, 52);
    }

    const a1 = generateLocalId(e);
    document.cookie = `a1=${a1};`;
    return a1;
}

// =============== xs ==================
function get_xs(e, r) {

    function _type_of(t) {
        return t && "undefined" != typeof Symbol && t.constructor === Symbol
            ? "symbol"
            : typeof t;
    }

    const h = {
        Pu: function (e, a) {
            if (null == e) {
                throw Error("Illegal argument " + e);
            }

            const result = reverseTool.hashFunc(e, a);
            var c = result.asBytes;

            if (a && a.asBytes) {
                return c;
            } else if (a && a.asString) {
                return result.asString;
            } else {
                return result.asHex;
            }
        },
    };

    /**
     * 生成 xs, 会用到 a1
     * @param e 请求路径 "/api/sns/web/v1/login/activate"
     * @param r 请求参数 {}
     * @returns {string}
     */
    function seccore_signv2(e, r) {
        // pass
        var a = window.toString;
        var c = e;

        var rType;
        if ("[object Object]" === a.call(r) || "[object Array]" === a.call(r)) {
            c += JSON.stringify(r);
        } else {
            rType = void 0 === r ? "undefined" : m._(r);
            if (rType === "object" && null !== r) {
                c += JSON.stringify(r);
            } else {
                if ("string" == typeof r) {
                    c += r;
                }
            }
        }
        // Pu 就是标准的 MD5
        var d = h.Pu([c].join(""));
        var s = h.Pu(e);
        var u = window.mnsv2(c, d, s);
        console.log("c: ", c); // pass
        console.log("d: ", d); // pass
        console.log("s: ", s); // pass

        console.log("u: ", u); // pass
        console.log("u length: ", u.length);

        // 构造签名结果所需的核心对象 l
        var l = {
            x0: "4.3.0",
            x1: "xhs-pc-web",
            x2: "Mac OS" || "PC",
            x3: u,
            x4: r ? (void 0 === r ? "undefined" : _type_of(r)) : "",
        };

        var jsonL = JSON.stringify(l);
        var lzResult = reverseTool.encodeUtf8(jsonL);
        var xeResult = reverseTool.b64Encode(lzResult);
        return "XYS_" + xeResult;
    }

    return seccore_signv2(e, r);
}

// =============== fp ==================
function get_fp() {
    let fp = undefined;
    window.xhsFingerprintV3.getCurMiniUa((e) => {
        fp = e;
    });
    console.log("fp: ", fp);
    return fp;
}

// =============== xs-common ==================
function get_xs_common(a1, xs, fp, device) {
    const obj = {
        s0: getPlatformCode(device),
        s1: "",
        x0: "1",
        x1: "4.3.0",
        x2: device,
        x3: "xhs-pc-web",
        x4: "5.6.1",
        // a1
        x5: a1,
        // 时间戳
        x6: window.loadts,
        // xs
        x7: xs,
        // b1
        x8: fp,
        x9: 1669426350, // 由 x6 x7 x8 生成
        x10: 0,
        x11: "normal",
    };

    function set_x9(obj) {
        const x6 = obj.x6,
            x7 = obj.x7,
            x8 = obj.x8;
        const x9 = reverseTool.enhancedCrc32("".concat(x6).concat(x7).concat(x8));
        console.log(`x9::::${x9}`);
        obj["x9"] = x9;
    }

    set_x9(obj);
    return reverseTool.b64Encode(reverseTool.encodeUtf8(JSON.stringify(obj)));

}

// =============== 测试 ==================

function test_xs() {
    const xs_eee = "/api/sns/web/v1/login/activate";
    const xs_aaa = {};
    console.log(get_xs(xs_eee, xs_aaa));
}

function test_a1() {
    const a1 = get_a1("Mac OS");
    console.log("a1: ", a1);
    console.log("loadts: ", window.loadts);
}

function test_xs_common() {
    const device = "Mac OS";
    const a1 = get_a1(device);
    const xs = get_xs("/api/sns/web/v1/homefeed", {
        "cursor_score": "1.7683725709380045E9",
        "num": 31,
        "refresh_type": 3,
        "note_index": 96,
        "unread_begin_note_id": "",
        "unread_end_note_id": "",
        "unread_note_count": 0,
        "category": "homefeed_recommend",
        "search_key": "",
        "need_num": 6,
        "image_formats": ["jpg", "webp", "avif"],
        "need_filter_image": false
    });
    const fp = get_fp();
    const xs_common = get_xs_common(a1, xs, fp, device);
    console.log("xs: ", xs);
    console.log("xs_common: ", xs_common);
}

function websession_xs_common() {
    const device = "Mac OS";
    const a1 = get_a1(device);
    const xs = get_xs("/api/sns/web/v1/login/activate", {});
    const fp = get_fp();
    const xs_common = get_xs_common(a1, xs, fp, device);
    console.log("xs: ", xs);
    console.log("xs_common: ", xs_common);
}

// test_a1()
// test_xs()
// get_fp()
// websession_xs_common()
// test_xs_common()



