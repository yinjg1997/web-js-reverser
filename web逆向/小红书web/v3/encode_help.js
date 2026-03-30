/**
 * Web逆向专用工具集（Node.js 模块化版本）
 * 文件名：reverseTool.js
 * 支持 CommonJS 导出，可被其他 Node.js 模块 require 引入
 */
(function() {
    // ==================== 私有常量与核心工具（与之前完全一致，无修改） ====================
    var CUSTOM_B64_TABLE = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5";
    var customB64Arr = [];
    for (var s = 0, u = CUSTOM_B64_TABLE.length; s < u; ++s) {
        customB64Arr[s] = CUSTOM_B64_TABLE[s];
    }
    var STANDARD_B64_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var coreBytesTool = {
        rotl: function rotl(e, r) {
            return (e << r) | (e >>> (32 - r));
        },
        rotr: function rotr(e, r) {
            return (e << (32 - r)) | (e >>> r);
        },
        endian: function endian(e) {
            if (e.constructor == Number) {
                return (0xff00ff & coreBytesTool.rotl(e, 8)) | (0xff00ff00 & coreBytesTool.rotl(e, 24));
            }
            for (var r = 0; r < e.length; r++) {
                e[r] = coreBytesTool.endian(e[r]);
            }
            return e;
        },
        randomBytes: function randomBytes(e) {
            var r = [];
            while (e > 0) {
                r.push(Math.floor(256 * Math.random()));
                e--;
            }
            return r;
        },
        bytesToWords: function bytesToWords(e) {
            var r = [];
            var a = 0;
            var c = 0;
            while (a < e.length) {
                r[c >>> 5] |= e[a] << (24 - (c % 32));
                a++;
                c += 8;
            }
            return r;
        },
        wordsToBytes: function wordsToBytes(e) {
            var r = [];
            var a = 0;
            while (a < 32 * e.length) {
                r.push((e[a >>> 5] >>> (24 - (a % 32))) & 255);
                a += 8;
            }
            return r;
        },
        bytesToHex: function bytesToHex(e) {
            var r = [];
            var a = 0;
            while (a < e.length) {
                r.push((e[a] >>> 4).toString(16));
                r.push((15 & e[a]).toString(16));
                a++;
            }
            return r.join("");
        },
        hexToBytes: function hexToBytes(e) {
            var r = [];
            var a = 0;
            while (a < e.length) {
                r.push(parseInt(e.substr(a, 2), 16));
                a += 2;
            }
            return r;
        },
        bytesToBase64: function bytesToBase64(e) {
            var a = [];
            var c = 0;
            while (c < e.length) {
                var d = (e[c] << 16) | (e[c + 1] << 8) | e[c + 2];
                var s = 0;
                while (s < 4) {
                    if (8 * c + 6 * s <= 8 * e.length) {
                        a.push(STANDARD_B64_TABLE.charAt((d >>> (6 * (3 - s))) & 63));
                    } else {
                        a.push("=");
                    }
                    s++;
                }
                c += 3;
            }
            return a.join("");
        },
        base64ToBytes: function base64ToBytes(e) {
            e = e.replace(/[^A-Z0-9+\/]/gi, "");
            var a = [];
            var c = 0;
            var d = 0;
            while (c < e.length) {
                d = ++c % 4;
                if (0 != d) {
                    a.push(
                        ((STANDARD_B64_TABLE.indexOf(e.charAt(c - 1)) & (Math.pow(2, -2 * d + 8) - 1)) << (2 * d)) |
                        (STANDARD_B64_TABLE.indexOf(e.charAt(c)) >>> (6 - 2 * d))
                    );
                }
            }
            return a;
        }
    };
    function isBuffer(e) {
        function t(e) {
            return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
        }
        function o(e) {
            return "function" == typeof e.readFloatLE && "function" == typeof e.slice && t(e.slice(0, 0));
        }
        return null != e && (t(e) || o(e) || !!e._isBuffer);
    }
    var encodeDecodeTool = {
        utf8: {
            stringToBytes: function stringToBytes(e) {
                return encodeDecodeTool.bin.stringToBytes(unescape(encodeURIComponent(e)));
            },
            bytesToString: function bytesToString(e) {
                return decodeURIComponent(escape(encodeDecodeTool.bin.bytesToString(e)));
            }
        },
        bin: {
            stringToBytes: function stringToBytes(e) {
                var r = [];
                var a = 0;
                while (a < e.length) {
                    r.push(255 & e.charCodeAt(a));
                    a++;
                }
                return r;
            },
            bytesToString: function bytesToString(e) {
                var r = [];
                var a = 0;
                while (a < e.length) {
                    r.push(String.fromCharCode(e[a]));
                    a++;
                }
                return r.join("");
            }
        }
    };

    // ==================== 公开方法（与之前完全一致，无修改） ====================
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

    function encodeUtf8(e) {
        var r = encodeURIComponent(e);
        var a = [];
        var c = 0;
        while (c < r.length) {
            var d = r.charAt(c);
            if ("%" === d) {
                var s = parseInt(r.charAt(c + 1) + r.charAt(c + 2), 16);
                a.push(s);
                c += 2;
            } else {
                a.push(d.charCodeAt(0));
            }
            c++;
        }
        return a;
    }

    function b64Encode(e) {
        function tripletToBase64(triplet) {
            return customB64Arr[triplet >> 18 & 63] + 
                   customB64Arr[triplet >> 12 & 63] + 
                   customB64Arr[triplet >> 6 & 63] + 
                   customB64Arr[63 & triplet];
        }
        function encodeChunk(chunk, start, end) {
            var d = [];
            var s = start;
            while (s < end) {
                var c = (chunk[s] << 16 & 0xff0000) + (chunk[s + 1] << 8 & 65280) + (255 & chunk[s + 2]);
                d.push(tripletToBase64(c));
                s += 3;
            }
            return d.join("");
        }

        var a = e.length;
        var d = a % 3;
        var s = [];
        var u = 16383;
        var f = 0;
        var l = a - d;
        while (f < l) {
            var chunkEnd = f + u > l ? l : f + u;
            s.push(encodeChunk(e, f, chunkEnd));
            f += u;
        }
        if (1 === d) {
            var r = e[a - 1];
            s.push(customB64Arr[r >> 2] + customB64Arr[r << 4 & 63] + "==");
        } else if (2 === d) {
            var r = (e[a - 2] << 8) + e[a - 1];
            s.push(customB64Arr[r >> 10] + customB64Arr[r >> 4 & 63] + customB64Arr[r << 2 & 63] + "=");
        }
        return s.join("");
    }

    var enhancedCrc32 = (function() {
        var r = 0xedb88320;
        var s = [];
        var d = 256;
        while (d--) {
            var a = d;
            var c = 8;
            while (c--) {
                a = 1 & a ? a >>> 1 ^ r : a >>> 1;
            }
            s[d] = a >>> 0;
        }
        return function(e) {
            if ("string" == typeof e) {
                var a = 0;
                var c = -1;
                while (a < e.length) {
                    c = s[255 & c ^ e.charCodeAt(a)] ^ c >>> 8;
                    a++;
                }
                return -1 ^ c ^ r;
            }
            var a = 0;
            var c = -1;
            while (a < e.length) {
                c = s[255 & c ^ e[a]] ^ c >>> 8;
                a++;
            }
            return -1 ^ c ^ r;
        }
    })();

    function hashFunc(e) {
        function i1(e, a) {
            if (e.constructor == String) {
                e = a && "binary" === a.encoding ? encodeDecodeTool.bin.stringToBytes(e) : encodeDecodeTool.utf8.stringToBytes(e);
            } else if (isBuffer(e)) {
                e = Array.prototype.slice.call(e, 0);
            } else if (!Array.isArray(e)) {
                e = e.toString();
            }
            var u = coreBytesTool.bytesToWords(e);
            var f = 8 * e.length;
            var l = 0x67452301;
            var _ = -0x10325477;
            var b = -0x67452302;
            var x = 0x10325476;
            var p = 0;
            while (p < u.length) {
                u[p] = 0xff00ff & (u[p] << 8 | u[p] >>> 24) | 0xff00ff00 & (u[p] << 24 | u[p] >>> 8);
                p++;
            }
            u[f >>> 5] |= 128 << f % 32;
            u[14 + (f + 64 >>> 9 << 4)] = f;
            var v = function(e, r, a, c, d, s, u) {
                var f = e + (r & a | ~r & c) + (d >>> 0) + u;
                return (f << s | f >>> 32 - s) + r;
            };
            var h = function(e, r, a, c, d, s, u) {
                var f = e + (r & c | a & ~c) + (d >>> 0) + u;
                return (f << s | f >>> 32 - s) + r;
            };
            var g = function(e, r, a, c, d, s, u) {
                var f = e + (r ^ a ^ c) + (d >>> 0) + u;
                return (f << s | f >>> 32 - s) + r;
            };
            var m = function(e, r, a, c, d, s, u) {
                var f = e + (a ^ (r | ~c)) + (d >>> 0) + u;
                return (f << s | f >>> 32 - s) + r;
            };
            p = 0;
            while (p < u.length) {
                var y = l, E = _, w = b, T = x;
                l = v(l, _, b, x, u[p + 0], 7, -0x28955b88);
                x = v(x, l, _, b, u[p + 1], 12, -0x173848aa);
                b = v(b, x, l, _, u[p + 2], 17, 0x242070db);
                _ = v(_, b, x, l, u[p + 3], 22, -0x3e423112);
                l = v(l, _, b, x, u[p + 4], 7, -0xa83f051);
                x = v(x, l, _, b, u[p + 5], 12, 0x4787c62a);
                b = v(b, x, l, _, u[p + 6], 17, -0x57cfb9ed);
                _ = v(_, b, x, l, u[p + 7], 22, -0x2b96aff);
                l = v(l, _, b, x, u[p + 8], 7, 0x698098d8);
                x = v(x, l, _, b, u[p + 9], 12, -0x74bb0851);
                b = v(b, x, l, _, u[p + 10], 17, -42063);
                _ = v(_, b, x, l, u[p + 11], 22, -0x76a32842);
                l = v(l, _, b, x, u[p + 12], 7, 0x6b901122);
                x = v(x, l, _, b, u[p + 13], 12, -0x2678e6d);
                b = v(b, x, l, _, u[p + 14], 17, -0x5986bc72);
                _ = v(_, b, x, l, u[p + 15], 22, 0x49b40821);
                
                l = h(l, _, b, x, u[p + 1], 5, -0x9e1da9e);
                x = h(x, l, _, b, u[p + 6], 9, -0x3fbf4cc0);
                b = h(b, x, l, _, u[p + 11], 14, 0x265e5a51);
                _ = h(_, b, x, l, u[p + 0], 20, -0x16493856);
                l = h(l, _, b, x, u[p + 5], 5, -0x29d0efa3);
                x = h(x, l, _, b, u[p + 10], 9, 0x2441453);
                b = h(b, x, l, _, u[p + 15], 14, -0x275e197f);
                _ = h(_, b, x, l, u[p + 4], 20, -0x182c0438);
                l = h(l, _, b, x, u[p + 9], 5, 0x21e1cde6);
                x = h(x, l, _, b, u[p + 14], 9, -0x3cc8f82a);
                b = h(b, x, l, _, u[p + 3], 14, -0xb2af279);
                _ = h(_, b, x, l, u[p + 8], 20, 0x455a14ed);
                l = h(l, _, b, x, u[p + 13], 5, -0x561c16fb);
                x = h(x, l, _, b, u[p + 2], 9, -0x3105c08);
                b = h(b, x, l, _, u[p + 7], 14, 0x676f02d9);
                _ = h(_, b, x, l, u[p + 12], 20, -0x72d5b376);
                
                l = g(l, _, b, x, u[p + 5], 4, -378558);
                x = g(x, l, _, b, u[p + 8], 11, -0x788e097f);
                b = g(b, x, l, _, u[p + 11], 16, 0x6d9d6122);
                _ = g(_, b, x, l, u[p + 14], 23, -0x21ac7f4);
                l = g(l, _, b, x, u[p + 1], 4, -0x5b4115bc);
                x = g(x, l, _, b, u[p + 4], 11, 0x4bdecfa9);
                b = g(b, x, l, _, u[p + 7], 16, -0x944b4a0);
                _ = g(_, b, x, l, u[p + 10], 23, -0x41404390);
                l = g(l, _, b, x, u[p + 13], 4, 0x289b7ec6);
                x = g(x, l, _, b, u[p + 0], 11, -0x155ed806);
                b = g(b, x, l, _, u[p + 3], 16, -0x2b10cf7b);
                _ = g(_, b, x, l, u[p + 6], 23, 0x4881d05);
                l = g(l, _, b, x, u[p + 9], 4, -0x262b2fc7);
                x = g(x, l, _, b, u[p + 12], 11, -0x1924661b);
                b = g(b, x, l, _, u[p + 15], 16, 0x1fa27cf8);
                _ = g(_, b, x, l, u[p + 2], 23, -0x3b53a99b);
                
                l = m(l, _, b, x, u[p + 0], 6, -0xbd6ddbc);
                x = m(x, l, _, b, u[p + 7], 10, 0x432aff97);
                b = m(b, x, l, _, u[p + 14], 15, -0x546bdc59);
                _ = m(_, b, x, l, u[p + 5], 21, -0x36c5fc7);
                l = m(l, _, b, x, u[p + 12], 6, 0x655b59c3);
                x = m(x, l, _, b, u[p + 3], 10, -0x70f3336e);
                b = m(b, x, l, _, u[p + 10], 15, -1051523);
                _ = m(_, b, x, l, u[p + 1], 21, -0x7a7ba22f);
                l = m(l, _, b, x, u[p + 8], 6, 0x6fa87e4f);
                x = m(x, l, _, b, u[p + 15], 10, -0x1d31920);
                b = m(b, x, l, _, u[p + 6], 15, -0x5cfebcec);
                _ = m(_, b, x, l, u[p + 13], 21, 0x4e0811a1);
                l = m(l, _, b, x, u[p + 4], 6, -0x8ac817e);
                x = m(x, l, _, b, u[p + 11], 10, -0x42c50dcb);
                b = m(b, x, l, _, u[p + 2], 15, 0x2ad7d2bb);
                _ = m(_, b, x, l, u[p + 9], 21, -0x14792c6f);
                
                l = (l + y) >>> 0;
                _ = (_ + E) >>> 0;
                b = (b + w) >>> 0;
                x = (x + T) >>> 0;
                p += 16;
            }
            var resultWords = coreBytesTool.endian([l, _, b, x]);
            var resultBytes = coreBytesTool.wordsToBytes(resultWords);
            return {
                asBytes: resultBytes,
                asHex: coreBytesTool.bytesToHex(resultBytes),
                asString: encodeDecodeTool.bin.bytesToString(resultBytes)
            };
        }
        return i1(e, { encoding: "utf8" });
    }

    // ==================== 关键：Node.js CommonJS 模块化导出 ====================
    module.exports = { // todo 改成 window 全局变量
        // CRC32 相关
        crc32: crc32,
        enhancedCrc32: enhancedCrc32,
        // 编码相关
        encodeUtf8: encodeUtf8,
        b64Encode: b64Encode,
        // 哈希相关（推测MD5）
        hashFunc: hashFunc,
        // 辅助工具
        coreBytesTool: coreBytesTool,
        encodeDecodeTool: encodeDecodeTool
    };
})();