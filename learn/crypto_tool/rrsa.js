const fs = require("fs");
const JSEncrypt = require("jsencrypt");

console.log("jsencrypt 只能用于生成 rsa ");
console.log("生成密钥: openssl genrsa -out private.pem 2048");
console.log("公钥可以自动从 private 中提取");
console.log(
  "公钥 ：用于加密 。可以安全地公开分享。私钥 ：用于解密 。请务必保密！",
);
console.log("rsa 每次生成的结果是变化的");
console.log("判断是否魔改: 解密回环验证（最可靠）用标准库的私钥解密目标网站的加密结果，能解出原文就是标准版")
console.log("RSA(非对称加密算法)有明文长度限制，而 AES(对称加密算法) 没有");

console.log("=========rsa 加密测试========");

const privateKey = fs.readFileSync("private.pem", "utf8");
const originalText = "Hello, World!";

const crypt = new JSEncrypt();
crypt.setPrivateKey(privateKey);

// 从私钥中提取公钥并保存
const publicKey = crypt.getPublicKey();
fs.writeFileSync("public.pem", publicKey);
console.log("公钥已生成并保存到 public.pem");

const encrypted = crypt.encrypt(originalText);
// const encrypted = "Y8ZHCDq6QzMcCk6FIC70vk/8z8mvTPz4elG9ZtC3XlGKaZKfqkdOkWyEIHKtlGsuiSst8Gj/NjvvnDwQxjwKjaCqXcQdPJLcxfRWcOmOfveYi9+WPoldOMqerQ9sslG1RqwQQvSLWCv0gKB0MJ2ieJuqSGByVlIGVSiDCl2YL4QoyTmyC9D3jMJR4NLLZi81LRiURQsROmpveN35GOdmUOUW0kHPj/aQ6upfwlOqQuTZpBSzviA+JadFFQ8JMezNk6bv3rBo0Utw6kTcgK6DbiUqmo6KT5kVMgjMRTLAkEknlxwojnz95NyxPe9yPUVKn1HBfRY0q5P0eMT77RUJ6g==";

// Decrypt data
const decrypted = crypt.decrypt(encrypted);

console.log("Original:", originalText);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
console.log("Match:", originalText === decrypted); // true
