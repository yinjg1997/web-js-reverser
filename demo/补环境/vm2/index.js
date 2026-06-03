const {VM} = require('vm2');
const fs = require('fs');

const env_code = fs.readFileSync('/Users/yin/Documents/codes/scrapytutorial/web逆向/小红书web/v3/env.js', 'utf8');
const mnsv2_code = fs.readFileSync('/Users/yin/Documents/codes/scrapytutorial/web逆向/小红书web/v3/mnsv2.js', 'utf8');
const fs_code = fs.readFileSync('/Users/yin/Documents/codes/scrapytutorial/web逆向/小红书web/v3/fs.js', 'utf8');
const get_ai_code = `

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
    document.cookie = "a1=" + a1 + ";";
    return a1;
}
`

const vm = new VM({
    timeout: 60 * 60 * 1000, // 代码执行超时时间，单位毫秒（防止无限循环）
    sandbox: {}
});

const all_code = env_code + mnsv2_code + get_ai_code;

// console.log('all_code:', all_code);
vm.run(all_code);
const get_a1 = vm.sandbox.get_a1; // 从沙箱中提取指定方法
const result3 = get_a1("Mac OS"); // 传入任意参数调用
console.log('result3:', result3);
