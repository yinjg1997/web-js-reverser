const {MD5, Hex, Base64, Utf8} = require('crypto-js')
const {xhs_crc32, xhs_b64Encode, xhs_encodeUtf8} = require('../tool.js')

require('./env.js')
require('./mnsv2.js')

// console.log(MD5('/api/sec/v1/scripting{"callFrom":"web","callback":"seccallback"}').toString(Hex));


/**
 * 生成 xs, window.mnsv2 会用到 a1
 * @param {string} e 请求路径 "/api/sns/web/v1/login/activate"
 * @param {object} r 请求参数 {}
 * @param {string} a1 a1
 * @returns {string}
 */
function get_xs(e, r, a1) {

    function _type_of(t) {
        return t && "undefined" != typeof Symbol && t.constructor === Symbol
            ? "symbol"
            : typeof t;
    }


    /**
     * 生成 xs, window.mnsv2 会用到 a1
     * @param {string} e 请求路径 "/api/sns/web/v1/login/activate"
     * @param {object} a 请求载呵 data
     * @returns {string}
     */
    function seccore_signv2(e, a) {
        var u = e;
        "[object Object]" === Object.prototype.toString.call(a) || "[object Array]" === Object.prototype.toString.call(a) || (void 0 === a ? "undefined" : _type_of(a)) === "object" && null !== a ? u += JSON.stringify(a) : "string" == typeof a && (u += a);
        var m = MD5([u].join("")).toString(Hex);
        var w = MD5(e).toString(Hex);
        var C = window.mnsv2(u, m, w);
        var P = {
            x0: '4.3.5',
            x1: "xhs-pc-web",
            x2: 'Mac OS' || "PC",
            x3: C,
            x4: a ? (a === undefined ? "undefined" : _type_of(a)) : ""
        };
        return "XYS_" + xhs_b64Encode(xhs_encodeUtf8(JSON.stringify(P)))
    }

    document.cookie = `a1=${a1};`;
    return seccore_signv2(e, r);
}

function test_mnsv2() {
    document.cookie = `a1=19eb46494fesupq0py6qfi3j5x4gn7pfd8l8a3rxf30000611522;`;
    const u = '/api/sec/v1/scripting{"callFrom":"web","callback":"seccallback"}'
    const m = '3d08093c65de13679b96a87493e1ed41'
    const w = "30075585641997ca77efa138e473890d"
    console.log("================")
    console.log(window.mnsv2)
    // const res = window.mnsv2(u, m, w);
    // console.log(res)
    // console.log(res.length)
}
test_mnsv2()

function test_search_notes() {
    const path = "/api/sns/web/v2/search/notes"
    const body = {
        "keyword": "变装",
        "page": 1,
        "page_size": 20,
        "search_id": "2gi8yr4lc43mmsb8vpb9s",
        "sort": "general",
        "note_type": 0,
        "ext_flags": [],
        "filters": [
            {
                "tags": [
                    "general"
                ],
                "type": "sort_type"
            },
            {
                "tags": [
                    "不限"
                ],
                "type": "filter_note_type"
            },
            {
                "tags": [
                    "不限"
                ],
                "type": "filter_note_time"
            },
            {
                "tags": [
                    "不限"
                ],
                "type": "filter_note_range"
            },
            {
                "tags": [
                    "不限"
                ],
                "type": "filter_pos_distance"
            }
        ],
        "geo": "",
        "image_formats": [
            "jpg",
            "webp",
            "avif"
        ],
        "message_id": "sending"
    }
    const a1 = "19ece8e23e66re1y8nhmyw64sj7zzmcsmaqgzrr3n50000305328"
    const xs = get_xs(path, body, a1)
    console.log(xs.length)
    console.log(xs)
}

function test_login_activate() {
    const path = "/api/sns/web/v1/login/activate"
    const body = {}
    const a1 = "19ece8e23e66re1y8nhmyw64sj7zzmcsmaqgzrr3n50000305328"
    const xs = get_xs(path, body, a1)
    console.log(xs.length)
    console.log(xs)
}
// test_search_notes()
// test_login_activate()