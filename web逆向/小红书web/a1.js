function genRandomString(e) {
    const CHARSET = "abcdefghijklmnopqrstuvwxyz1234567890";
    return Array(e).fill(void 0).map(function () {
        return CHARSET[Math.floor(36 * Math.random())]
    }).join("")
}

const crc32 = function crc32(e) {
    let a, r = [];
    for (let c = 0; c < 256; c++) {
        a = c;
        for (let d = 0; d < 8; d++)
            a = 1 & a ? 0xedb88320 ^ a >>> 1 : a >>> 1;
        r[c] = a
    }
    let s = -1;
    for (let f = 0; f < e.length; f++)
        s = s >>> 8 ^ r[255 & (s ^ e.charCodeAt(f))];
    return (-1 ^ s) >>> 0
};


function generateLocalId() {
    const a = 3
        , r = "000"
        ,
        c = "".concat((+new Date).toString(16)).concat(genRandomString(30)).concat(a).concat("0").concat(r)
        , d = (0, crc32)(c);
    return "".concat(c).concat(d).substring(0, 52)
}

function get_a1() {
    const m = 1e3;
    let y = "", w = 0;

    for (; w < m && 52 !== y.length;) {
        y = (0, generateLocalId)();
        w++;
    }

    return y;
}

console.log("\na1:") // activate 的 a1
console.log(get_a1())

/**
 * 生成随机 WebID
 * @param {number} c - WebID 的长度，默认 32 位
 * @returns {string} 随机生成的 WebID
 */
function get_webid(c = 32) {
  const s = "abcdef0123456789";
  let webId = "";
  for (let i = 0; i < c; i++) {
    // 生成 0 到 s.length-1 之间的随机整数
    const randomIndex = Math.floor(Math.random() * s.length);
    webId += s[randomIndex];
  }
  return webId;
}

// 使用示例：
console.log("\nwebId:")
console.log(get_webid()); // 生成 32 位 WebID（默认）
