const CryptoJS = require("crypto-js");

console.log("AES 每次加密生成的结果是固定的");
console.log("Node 自带的crypto库结果相同");


function AES_CryptoJS_test() {
  const plaintext = "hello world";
  const key = "1234567890123456";
  const iv = "1234567890123456";

  function encrypt(plaintext, key, iv) {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plaintext), // 明文转 WordArray
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7, // 和 Node.js PKCS7 填充一致
      },
    );
    // encrypt返回的是CipherParams对象，toString()会输出Base64编码的密文
    return encrypted.toString();
  }

  function decrypt(ciphertext, key, iv) {
    const decrypted = CryptoJS.AES.decrypt(
      // ciphertext,  // ✅ 直接传字符串
      {
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext), // ✅ 必须 parse
      },
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  console.log("AES_CryptoJS_test encrypt:::", encrypt(plaintext, key, iv));
  console.log(
    "AES_CryptoJS_test decrypt:::",
    decrypt(encrypt(plaintext, key, iv), key, iv),
  );
}

AES_CryptoJS_test();
