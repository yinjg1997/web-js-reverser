const {xhs_b64Encode, xhs_encodeUtf8, xhs_crc32} = require("./tool");
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

/**
 *
 * @param {string} e device
 * @returns {string}
 */
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

/**
 *
 * @param {string} e device
 * @returns {string}
 */
function get_a1(e) {

    var CHARSET = "abcdefghijklmnopqrstuvwxyz1234567890";

    /**
     *
     * @param {number} e
     * @param {string} CHARSET
     * @returns {string}
     */
    function genRandomString(e, CHARSET) {
        return Array(e)
            .fill(void 0)
            .map(function () {
                return CHARSET[Math.floor(36 * Math.random())];
            })
            .join("");
    }

    /**
     *
     * @param {string} e “Mac OS”
     * @returns
     */
    function generateLocalId(e) {
        var r = getPlatformCode(e),
            a = "000",
            c = ""
                .concat((+new Date()).toString(16))
                .concat(genRandomString(30, CHARSET))
                .concat(r)
                .concat("0")
                .concat(a),
            d = xhs_crc32(c);
        return "".concat(c).concat(d).substring(0, 52);
    }

    const a1 = generateLocalId(e);
    // document.cookie = `a1=${a1};`;
    return a1;
}

console.log(get_a1("MacOs"))