const crpto = require("crypto")
function get_uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
    var e = (16 * Math.random()) | 0;
    return ("x" === t ? e : (3 & e) | 8).toString(16);
  });
}

const uuid = get_uuid()

const user_mup  = new Date().getTime()

const api_path = "/api/lowcode/bff/productDetail/table/productTable.ajax"

const user_mnp =  crpto.createHash("md5").update(`${api_path + uuid + user_mup}372ad2c2b6`).digest("hex")

console.log("uuid: ", uuid);
console.log("user_mup: ", user_mup);
console.log("user_mnp: ", user_mnp);



const Je = (e) => {
  const { pathname: n, params: t } = (0, o.qg)((0, o.Tr)(e.url)),
    r = e.mock && ee ? e.url : ((e) => $ + e)(`${n}`),
    i = e?.header?.uuid,
    s = e.headers ? "headers" : "header",
    l = i || (0, a.A)(),
    d = n,
    A = new Date().getTime(),
    f = {
      uuid: l,
      "User-mup": A,
      "User-mnp": Ee(`${d + l + A}372ad2c2b6`),
      "X-Requested-With": "XMLHttpRequest",
    };
  return (
    !(0, c.UM)(ge.sf) &&
      (0, c.UM)(`${ge.sf}_child`) &&
      de(ge.sf, (0, c.UM)(`${ge.sf}_child`)),
    !(0, c.UM)(ge.bs) &&
      (0, c.UM)(`${ge.bs}_child`) &&
      de(ge.bs, (0, c.UM)(`${ge.bs}_child`)),
    ge.ibds2 &&
      !(0, c.UM)(ge.ibds2) &&
      (0, c.UM)(`${ge.ibds2}_child`) &&
      de(ge.ibds2, (0, c.UM)(`${ge.ibds2}_child`)),
    {
      ...e,
      url: (0, o.g)(r, t),
      [s]: {
        ...e[s],
        ...f,
      },
    }
  );
};
