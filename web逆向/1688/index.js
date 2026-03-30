const crypto = require("crypto");

function get_encrpy_str(token, data) {
//   const t = new Date().getTime();
  const t = 1773482159083;
  const u = "12574478";
  return token + "&" + t + "&" + u + "&" + data;
}
// const str2 = `a84e7ac54ddac1c0cbd7318f3c5e4630&1773482159083&12574478&{"terminalType":"work","accountType":"1688","ref":"{}","bizParams":"{}","routingDataType":"POSTMAN","dataPlans":"{\\"CDT_54a3NW\\":{\\"items\\":[\\"get\\"],\\"params\\":{\\"get\\":{\\"scene\\":\\"home_page\\"}}}}"}`
// _m_h5_tk
const test_str = get_encrpy_str("a84e7ac54ddac1c0cbd7318f3c5e4630", '{"terminalType":"work","accountType":"1688","ref":"{}","bizParams":"{}","routingDataType":"POSTMAN","dataPlans":"{\\"CDT_3ae65Y\\":{\\"items\\":[\\"baseAccountInfo\\"],\\"params\\":{\\"baseAccountInfo\\":{}}}}"}')

const sign = crypto.createHash("md5").update(test_str, "utf8").digest("hex");

console.log("sign::", sign)