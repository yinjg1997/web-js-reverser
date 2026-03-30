const crypto = require("crypto");

function Se(d, O, x) {
  if (
    (O === void 0 && (O = !1),
    x === void 0 && (x = "048a9c4943398714b356a696503d2d36"),
    typeof O == "string" && typeof x == "boolean")
  ) {
    var w = O;
    ((O = x), (x = w));
  }
  O && console.log("\u8F6C\u5316\u524Dparams=", d);
  var P = function (j, C) {
      return C === null ? void 0 : C;
    },
    E = Object.keys(d)
      .sort()
      .reduce(function (j, C) {
        return d[C] === void 0
          ? j
          : j +
              C +
              (function (K) {
                if ([void 0, null, ""].includes(K)) return "";
                if (Object.prototype.toString.call(K) === "[object Object]")
                  return JSON.stringify(K, P);
                if (Array.isArray(K)) {
                  var p = "";
                  return (
                    K.forEach(function (q, f) {
                      (Object.prototype.toString.call(q) ===
                        "[object Object]" || Array.isArray(q)
                        ? (p += JSON.stringify(q, P))
                        : [void 0, null].includes(q)
                          ? (p += null)
                          : (p += q.toString()),
                        f < K.length - 1 && (p += ","));
                    }),
                    p
                  );
                }
                return K.toString();
              })(d[C]);
      }, "");
  return (
    O &&
      (console.log("\u8F6C\u5316\u540EparamsToken=", E),
      console.log("salt=", x)),
    /[\u00A0\u3000]/g.test(E) &&
      console.warn(
        "\u9A8C\u7B7E\u8B66\u544A\uFF1A\u8BF7\u5148\u53BB\u9664\u975E\u6CD5\u5B57\u7B26\\u00A0\uFF0C\\u3000",
      ),
    // m((E += x))
    crypto
      .createHash("md5")
      .update(E + x)
      .digest("hex")
  );
}

const encrypt_params = {
  params: {
    amountType: 2,
    timeType: 7,
    startTime: "20260302",
    endTime: "20260302",
  },
};
console.log(Se(encrypt_params));
