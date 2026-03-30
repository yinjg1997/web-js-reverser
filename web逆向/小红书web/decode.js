for (var c = [], d = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5", s = 0, f = d.length; s < f; ++s)
    c[s] = d[s];

var crc32 = function crc32(e) {
    for (var a, r = [], c = 0; c < 256; c++) {
        a = c;
        for (var d = 0; d < 8; d++)
            a = 1 & a ? 0xedb88320 ^ a >>> 1 : a >>> 1;
        r[c] = a
    }
    for (var s = -1, f = 0; f < e.length; f++)
        s = s >>> 8 ^ r[255 & (s ^ e.charCodeAt(f))];
    return (-1 ^ s) >>> 0
};

function tripletToBase64(e) {
    return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e]
}

function encodeChunk(e, a, r) {
    for (var c, d = [], s = a; s < r; s += 3)
        c = (e[s] << 16 & 0xff0000) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
            d.push(tripletToBase64(c));
    return d.join("")
}

function b64Encode(e) {
    for (var a, r = e.length, d = r % 3, s = [], f = 16383, u = 0, l = r - d; u < l; u += f)
        s.push(encodeChunk(e, u, u + f > l ? l : u + f));
    return 1 === d ? (a = e[r - 1],
        s.push(c[a >> 2] + c[a << 4 & 63] + "==")) : 2 === d && (a = (e[r - 2] << 8) + e[r - 1],
        s.push(c[a >> 10] + c[a >> 4 & 63] + c[a << 2 & 63] + "=")),
        s.join("")
}

function encodeUtf8(e) {
    for (var a = encodeURIComponent(e), r = [], c = 0; c < a.length; c++) {
        var d = a.charAt(c);
        if ("%" === d) {
            var s = parseInt(a.charAt(c + 1) + a.charAt(c + 2), 16);
            r.push(s),
                c += 2
        } else
            r.push(d.charCodeAt(0))
    }
    return r
}

function get_xs(mns0201) {
    const obj = {
        "x0": "4.2.6",
        "x1": "xhs-pc-web",
        "x2": "Mac OS",
        "x3": mns0201,
        "x4": "object"
    }
    return "XYS_" + b64Encode(encodeUtf8(JSON.stringify(obj)))
}

let mns0201 = "mns0201_do28qXv+o1SH+/+qxBfSSxOnAuUqaUbL0hFx0QVOSTgE76yOEzyeX7QH4aA1t/XN/hdBJAMTD3IxU87Ll52I02mU/YkAp+h8KvmEPPk46yyziwNqWr+NQgSQfFwqzv8MdjGobBUi5bypunJnJwZvi5qGSGLJgkE1hT+a+v=="
const xs = get_xs(mns0201)
console.log(xs);
console.log(xs.length);
