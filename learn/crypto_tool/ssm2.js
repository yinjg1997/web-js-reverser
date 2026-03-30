const SM2 = require("sm-crypto").sm2;

console.log("sm-crypto 用于国密 SM2 加密");
console.log("SM2 每次加密结果也是变化的（包含随机数）");
console.log("SM2(非对称加密算法)有明文长度限制，适合加密小量数据或密钥");

console.log("=========SM2 加密测试========");

const keypair = SM2.generateKeyPairHex();
const publicKey = keypair.publicKey;
const privateKey = keypair.privateKey;

console.log("生成的公钥:", publicKey);
console.log("生成的私钥:", privateKey);

const originalText = "Hello, World!";

const cipherMode = 1;

const encrypted = SM2.doEncrypt(originalText, publicKey, cipherMode);
const decrypted = SM2.doDecrypt(encrypted, privateKey, cipherMode);

console.log("Original:", originalText);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
console.log("Match:", originalText === decrypted);

console.log("\n=========SM2 签名测试========");

const sigValueHex = SM2.doSignature(originalText, privateKey);
const verifyResult = SM2.doVerifySignature(originalText, sigValueHex, publicKey);

console.log("签名:", sigValueHex);
console.log("验签结果:", verifyResult);
