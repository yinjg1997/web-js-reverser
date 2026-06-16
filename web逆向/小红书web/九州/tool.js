
function tripletToBase64(e) {
    var ALPHABET = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5";
    var u = [];
    var i = 0;
    while (i < ALPHABET.length) {
        u[i] = ALPHABET[i];
        i++;
    }
    return u[e >> 18 & 63] + u[e >> 12 & 63] + u[e >> 6 & 63] + u[63 & e];
}

/**
 *
 * @param  {string} e 待编码的字符串
 * @returns {string}
 */
function crc32(e) {
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


function encodeChunk(e, a, s) {
    var m = [];
    var w = a;
    while (w < s) {
        var chunk = (e[w] << 16 & 0xff0000) + (e[w + 1] << 8 & 65280) + (255 & e[w + 2]);
        m.push(tripletToBase64(chunk));
        w += 3;
    }
    return m.join("");
}

/**
 *
 * @param  {string} e 待编码的字符串
 * @returns {string}
 */
function b64Encode(e) {
    var a;
    var s = e.length;
    var m = s % 3;
    var w = [];
    var C = 16383;
    var R = 0;
    var P = s - m;
    while (R < P) {
        w.push(encodeChunk(e, R, R + C > P ? P : R + C));
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
function encodeUtf8(e) {
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


// console.log(crc32("hello"))
// console.log(b64Encode("hello"))
// console.log(encodeUtf8("hello"))

module.exports = {xhs_crc32: crc32, xhs_b64Encode: b64Encode, xhs_encodeUtf8: encodeUtf8};

