const { Base64 } = require("js-base64");
const crypto = require("crypto");

const str = "hello world";

function base64_encode_test(str) {
  console.log("=========base64 编码测试========");
  console.log(Base64.btoa(str));
  console.log(btoa(str));
  console.log(Buffer.from(str).toString("base64"));
}

base64_encode_test(str);
