const crypto = require("crypto");
const ddd = function (e) {
  e = e.replace(/\r\n/g, "\n");
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e.charCodeAt(n);
    r < 128
      ? (t += String.fromCharCode(r))
      : (r > 127 && r < 2048
          ? (t += String.fromCharCode((r >> 6) | 192))
          : ((t += String.fromCharCode((r >> 12) | 224)),
            (t += String.fromCharCode(((r >> 6) & 63) | 128))),
        (t += String.fromCharCode((63 & r) | 128)));
  }
  return t;
};
const h = "A4NjFqYu5wPHsO0XTdDgMa2r1ZQocVte9UJBvk6/7=yRnhISGKblCWi+LpfE8xzm3";

function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

/**
 *
 * @param {*} f 1772086614059
 * @param {*} p 'test'
 * @param {*} u '/api/edith/ad/data/report'
 * @param {*} c 接口参数
 * @returns
 */
function get_xs_param(f, p, u, c) {
  return md5(
    [
      f,
      p,
      u,
      "[object Object]" === Object.prototype.toString.call(c) ||
      "[object Array]" === Object.prototype.toString.call(c)
        ? JSON.stringify(c)
        : "",
    ].join(""),
  );
}
/**
 * e 为 md5 结果
 * @param {*} e
 * @returns
 */
const get_xs = function (e) {
  var t,
    n,
    r,
    i,
    o,
    a,
    s,
    l = "",
    u = 0;
  for (e = ddd(e); u < e.length; )
    ((t = e.charCodeAt(u++)),
      (n = e.charCodeAt(u++)),
      (r = e.charCodeAt(u++)),
      (i = t >> 2),
      (o = ((3 & t) << 4) | (n >> 4)),
      (a = ((15 & n) << 2) | (r >> 6)),
      (s = 63 & r),
      isNaN(n) ? (a = s = 64) : isNaN(r) && (s = 64),
      (l = l + h.charAt(i) + h.charAt(o) + h.charAt(a) + h.charAt(s)));
  return l;
};

const x_t = f;

console.log("f::", f);

const xs_param = get_xs_param(
  f,
  "test",
  "/api/edith/ad/data/report",
  {
    startDate: "2026-02-01",
    endDate: "2026-02-25",
    webModule: "roi2_report_page",
    dataSource: "account",
    timeUnit: "DAY",
    dataPattern: "table",
    columns: [
      "time",
      "fee",
      "allDealOrderNum1d",
      "allDealOrderNum1dCost",
      "allDealOrderGmv1d",
      "allRoi1d",
      "sameSpuAllDealOrderNum1d",
      "sameSpuAllDealOrderGmv1d",
      "allDealOrderGmv7d",
      "allDealOrderNum7d",
      "allRoi7d",
      "allDealOrderNum7dCost",
      "sameSpuAllDealOrderNum7d",
      "sameSpuAllDealOrderGmv7d",
    ],
    pageNum: 2,
    pageSize: 10,
  },
);

console.log(get_xs(xs_param));