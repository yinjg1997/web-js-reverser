const fs = require("fs");
const JSEncrypt = require("jsencrypt");

console.log("jsencrypt 只能用于生成 rsa ");
console.log("生成密钥: openssl genrsa -out private.pem 2048");
console.log("公钥可以自动从 private 中提取");
console.log(
  "公钥 ：用于加密 。可以安全地公开分享。私钥 ：用于解密 。请务必保密！",
);
console.log("rsa 每次生成的结果是变化的");
console.log("RSA(非对称加密算法)有明文长度限制，而 AES(对称加密算法) 没有");

console.log("=========rsa 加密测试========");

const privateKey = fs.readFileSync("private.pem", "utf8");
const originalText = "Hello, World!";

const crypt = new JSEncrypt();
crypt.setPrivateKey(privateKey);
const encrypted = crypt.encrypt(originalText);

// Decrypt data
const decrypted = crypt.decrypt(encrypted);

console.log("Original:", originalText);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
console.log("Match:", originalText === decrypted); // true
