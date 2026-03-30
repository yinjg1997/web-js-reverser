


const a =
  "//" +
  (n.prefix ? n.prefix + "." : "") +
  (n.subDomain ? n.subDomain + "." : "") +
  n.mainDomain +
  "/h5/" +
  r.api.toLowerCase() +
  "/" +
  r.v.toLowerCase() +
  "/";

const u = r.appKey || ("waptest" === n.subDomain ? "4272" : "12574478");

const c = new Date().getTime();

const s = (function (e) {
  function t(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  function r(e, t) {
    var r, n, o, i, a;
    return (
      (o = 2147483648 & e),
      (i = 2147483648 & t),
      (a = (1073741823 & e) + (1073741823 & t)),
      (r = 1073741824 & e) & (n = 1073741824 & t)
        ? 2147483648 ^ a ^ o ^ i
        : r | n
          ? 1073741824 & a
            ? 3221225472 ^ a ^ o ^ i
            : 1073741824 ^ a ^ o ^ i
          : a ^ o ^ i
    );
  }
  function n(e, n, o, i, a, u, c) {
    return (
      (e = r(
        e,
        r(
          r(
            (function (e, t, r) {
              return (e & t) | (~e & r);
            })(n, o, i),
            a,
          ),
          c,
        ),
      )),
      r(t(e, u), n)
    );
  }
  function o(e, n, o, i, a, u, c) {
    return (
      (e = r(
        e,
        r(
          r(
            (function (e, t, r) {
              return (e & r) | (t & ~r);
            })(n, o, i),
            a,
          ),
          c,
        ),
      )),
      r(t(e, u), n)
    );
  }
  function i(e, n, o, i, a, u, c) {
    return (
      (e = r(
        e,
        r(
          r(
            (function (e, t, r) {
              return e ^ t ^ r;
            })(n, o, i),
            a,
          ),
          c,
        ),
      )),
      r(t(e, u), n)
    );
  }
  function a(e, n, o, i, a, u, c) {
    return (
      (e = r(
        e,
        r(
          r(
            (function (e, t, r) {
              return t ^ (e | ~r);
            })(n, o, i),
            a,
          ),
          c,
        ),
      )),
      r(t(e, u), n)
    );
  }
  function u(e) {
    var t,
      r = "",
      n = "";
    for (t = 0; 3 >= t; t++)
      r += (n = "0" + ((e >>> (8 * t)) & 255).toString(16)).substr(
        n.length - 2,
        2,
      );
    return r;
  }
  var c, s, l, f, p, d, m, v, y, g;
  for (
    g = (function (e) {
      for (
        var t,
          r = e.length,
          n = r + 8,
          o = 16 * ((n - (n % 64)) / 64 + 1),
          i = new Array(o - 1),
          a = 0,
          u = 0;
        r > u;
      )
        ((a = (u % 4) * 8),
          (i[(t = (u - (u % 4)) / 4)] = i[t] | (e.charCodeAt(u) << a)),
          u++);
      return (
        (a = (u % 4) * 8),
        (i[(t = (u - (u % 4)) / 4)] = i[t] | (128 << a)),
        (i[o - 2] = r << 3),
        (i[o - 1] = r >>> 29),
        i
      );
    })(
      (e = (function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", r = 0; r < e.length; r++) {
          var n = e.charCodeAt(r);
          128 > n
            ? (t += String.fromCharCode(n))
            : n > 127 && 2048 > n
              ? ((t += String.fromCharCode((n >> 6) | 192)),
                (t += String.fromCharCode((63 & n) | 128)))
              : ((t += String.fromCharCode((n >> 12) | 224)),
                (t += String.fromCharCode(((n >> 6) & 63) | 128)),
                (t += String.fromCharCode((63 & n) | 128)));
        }
        return t;
      })(e)),
    ),
      d = 1732584193,
      m = 4023233417,
      v = 2562383102,
      y = 271733878,
      c = 0;
    c < g.length;
    c += 16
  )
    ((s = d),
      (l = m),
      (f = v),
      (p = y),
      (d = n(d, m, v, y, g[c + 0], 7, 3614090360)),
      (y = n(y, d, m, v, g[c + 1], 12, 3905402710)),
      (v = n(v, y, d, m, g[c + 2], 17, 606105819)),
      (m = n(m, v, y, d, g[c + 3], 22, 3250441966)),
      (d = n(d, m, v, y, g[c + 4], 7, 4118548399)),
      (y = n(y, d, m, v, g[c + 5], 12, 1200080426)),
      (v = n(v, y, d, m, g[c + 6], 17, 2821735955)),
      (m = n(m, v, y, d, g[c + 7], 22, 4249261313)),
      (d = n(d, m, v, y, g[c + 8], 7, 1770035416)),
      (y = n(y, d, m, v, g[c + 9], 12, 2336552879)),
      (v = n(v, y, d, m, g[c + 10], 17, 4294925233)),
      (m = n(m, v, y, d, g[c + 11], 22, 2304563134)),
      (d = n(d, m, v, y, g[c + 12], 7, 1804603682)),
      (y = n(y, d, m, v, g[c + 13], 12, 4254626195)),
      (v = n(v, y, d, m, g[c + 14], 17, 2792965006)),
      (d = o(
        d,
        (m = n(m, v, y, d, g[c + 15], 22, 1236535329)),
        v,
        y,
        g[c + 1],
        5,
        4129170786,
      )),
      (y = o(y, d, m, v, g[c + 6], 9, 3225465664)),
      (v = o(v, y, d, m, g[c + 11], 14, 643717713)),
      (m = o(m, v, y, d, g[c + 0], 20, 3921069994)),
      (d = o(d, m, v, y, g[c + 5], 5, 3593408605)),
      (y = o(y, d, m, v, g[c + 10], 9, 38016083)),
      (v = o(v, y, d, m, g[c + 15], 14, 3634488961)),
      (m = o(m, v, y, d, g[c + 4], 20, 3889429448)),
      (d = o(d, m, v, y, g[c + 9], 5, 568446438)),
      (y = o(y, d, m, v, g[c + 14], 9, 3275163606)),
      (v = o(v, y, d, m, g[c + 3], 14, 4107603335)),
      (m = o(m, v, y, d, g[c + 8], 20, 1163531501)),
      (d = o(d, m, v, y, g[c + 13], 5, 2850285829)),
      (y = o(y, d, m, v, g[c + 2], 9, 4243563512)),
      (v = o(v, y, d, m, g[c + 7], 14, 1735328473)),
      (d = i(
        d,
        (m = o(m, v, y, d, g[c + 12], 20, 2368359562)),
        v,
        y,
        g[c + 5],
        4,
        4294588738,
      )),
      (y = i(y, d, m, v, g[c + 8], 11, 2272392833)),
      (v = i(v, y, d, m, g[c + 11], 16, 1839030562)),
      (m = i(m, v, y, d, g[c + 14], 23, 4259657740)),
      (d = i(d, m, v, y, g[c + 1], 4, 2763975236)),
      (y = i(y, d, m, v, g[c + 4], 11, 1272893353)),
      (v = i(v, y, d, m, g[c + 7], 16, 4139469664)),
      (m = i(m, v, y, d, g[c + 10], 23, 3200236656)),
      (d = i(d, m, v, y, g[c + 13], 4, 681279174)),
      (y = i(y, d, m, v, g[c + 0], 11, 3936430074)),
      (v = i(v, y, d, m, g[c + 3], 16, 3572445317)),
      (m = i(m, v, y, d, g[c + 6], 23, 76029189)),
      (d = i(d, m, v, y, g[c + 9], 4, 3654602809)),
      (y = i(y, d, m, v, g[c + 12], 11, 3873151461)),
      (v = i(v, y, d, m, g[c + 15], 16, 530742520)),
      (d = a(
        d,
        (m = i(m, v, y, d, g[c + 2], 23, 3299628645)),
        v,
        y,
        g[c + 0],
        6,
        4096336452,
      )),
      (y = a(y, d, m, v, g[c + 7], 10, 1126891415)),
      (v = a(v, y, d, m, g[c + 14], 15, 2878612391)),
      (m = a(m, v, y, d, g[c + 5], 21, 4237533241)),
      (d = a(d, m, v, y, g[c + 12], 6, 1700485571)),
      (y = a(y, d, m, v, g[c + 3], 10, 2399980690)),
      (v = a(v, y, d, m, g[c + 10], 15, 4293915773)),
      (m = a(m, v, y, d, g[c + 1], 21, 2240044497)),
      (d = a(d, m, v, y, g[c + 8], 6, 1873313359)),
      (y = a(y, d, m, v, g[c + 15], 10, 4264355552)),
      (v = a(v, y, d, m, g[c + 6], 15, 2734768916)),
      (m = a(m, v, y, d, g[c + 13], 21, 1309151649)),
      (d = a(d, m, v, y, g[c + 4], 6, 4149444226)),
      (y = a(y, d, m, v, g[c + 11], 10, 3174756917)),
      (v = a(v, y, d, m, g[c + 2], 15, 718787259)),
      (m = a(m, v, y, d, g[c + 9], 21, 3951481745)),
      (d = r(d, s)),
      (m = r(m, l)),
      (v = r(v, f)),
      (y = r(y, p)));
  return (u(d) + u(m) + u(v) + u(y)).toLowerCase();
})(n.token + "&" + c + "&" + u + "&" + r.data);

const l = {
  jsv: "2.7.2",
  appKey: u,
  t: c,
  sign: s,
};

const f = {
  data: r.data,
  ua: r.ua,
};
