// 引入内置的 crypto 模块
const crypto = require("crypto");
const CryptoJS = require('crypto-js');

/**
 * 计算字符串的 MD5 哈希值
 * @param {string} str - 要计算的字符串
 * @returns {string} MD5 哈希值
 */
function MD5_test(str) {
  console.log(crypto.createHash("md5").update(str, "utf8").digest("hex"));
  console.log(CryptoJS.MD5(str).toString(CryptoJS.enc.Hex));
  
}

const testStr = "hello world";

MD5_test(testStr);
