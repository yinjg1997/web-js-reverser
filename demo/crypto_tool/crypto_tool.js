const CryptoJS = require("crypto-js");
const crypto = require("crypto"); // Node.js内置crypto模块，用于RSA实现

// 原始数据
const body_params = {
  enc: "utf-8",
  pvid: "a0772c31240243308127f319ada3cbf3",
  area: "15_1213_3038_59932",
  page: 2,
  new_interval: true,
  s: 24,
};

const SHA256 = function (s) {
  return CryptoJS.SHA256(s).toString();
};

// 打印SHA256结果
const bodyJsonStr = JSON.stringify(body_params);
console.log("=== SHA256 结果 ===");
console.log(SHA256(bodyJsonStr));
console.log("------------------------\n");

// 2. AES 加密/解密实现（基于CryptoJS）
/**
 * AES 加密函数（CBC模式，PKCS7填充，兼容常用场景）
 * @param {string} plainText 明文（需先转为字符串，如JSON.stringify后的对象）
 * @param {string} key 密钥（16/24/32位，对应AES-128/AES-192/AES-256）
 * @param {string} iv 初始向量（必须16位，CBC模式必填）
 * @returns {string} 加密后的Base64字符串
 */
const aesEncrypt = (plainText, key, iv) => {
  // 转换密钥和IV为CryptoJS可识别的WordArray格式
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

  // 执行AES加密（CBC模式，PKCS7填充是CryptoJS默认，无需额外配置）
  const cipherResult = CryptoJS.AES.encrypt(plainText, keyWordArray, {
    iv: ivWordArray,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 返回Base64格式的加密结果（也可返回hex格式：cipherResult.ciphertext.toString(CryptoJS.enc.Hex)）
  return cipherResult.toString();
};

/**
 * AES 解密函数（与加密参数一致，才能正确解密）
 * @param {string} cipherText 加密后的Base64字符串
 * @param {string} key 密钥（与加密时一致）
 * @param {string} iv 初始向量（与加密时一致）
 * @returns {string} 解密后的明文
 */
const aesDecrypt = (cipherText, key, iv) => {
  // 转换密钥和IV为CryptoJS可识别的WordArray格式
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

  // 执行AES解密
  const decryptResult = CryptoJS.AES.decrypt(cipherText, keyWordArray, {
    iv: ivWordArray,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 转换为Utf8格式的明文
  return decryptResult.toString(CryptoJS.enc.Utf8);
};

// AES 演示配置（注意：生产环境中密钥和IV需安全存储，不可硬编码）
const AES_KEY = "1234567890abcdef"; // 16位，对应AES-128
const AES_IV = "fedcba0987654321"; // 16位，CBC模式必填

// 执行AES加密和解密
const aesCipherText = aesEncrypt(bodyJsonStr, AES_KEY, AES_IV);
const aesPlainText = aesDecrypt(aesCipherText, AES_KEY, AES_IV);

console.log("=== AES 操作结果 ===");
console.log("加密后的内容：", aesCipherText);
console.log("解密后的内容：", aesPlainText);
console.log("------------------------\n");

// 3. RSA 加密/解密实现（基于Node.js内置crypto模块）
/**
 * 生成RSA公钥和私钥对（同步方式，推荐2048位或4096位）
 * @param {number} modulusLength 密钥长度（默认2048，最小值1024）
 * @returns {object} 包含公钥和私钥的对象
 */
const generateRsaKeyPair = (modulusLength = 2048) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: modulusLength, // 密钥长度
    publicKeyEncoding: {
      type: "spki", // 公钥格式（常用spki，兼容多数场景）
      format: "pem", // 编码格式（PEM格式，文本格式，便于存储和传输）
    },
    privateKeyEncoding: {
      type: "pkcs8", // 私钥格式（pkcs8，安全规范，推荐使用）
      format: "pem", // 编码格式（PEM格式）
    },
  });
  return { publicKey, privateKey };
};

/**
 * RSA 加密（使用公钥加密，只能用对应私钥解密）
 * @param {string} plainText 明文
 * @param {string} publicKey RSA公钥（PEM格式）
 * @returns {string} 加密后的Base64字符串
 */
const rsaEncrypt = (plainText, publicKey) => {
  // 执行RSA加密（OAEP填充，sha256哈希，兼容高安全场景；也可使用pkcs1v15填充）
  const buffer = Buffer.from(plainText, "utf8");
  const cipherBuffer = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP填充（更安全）
      oaepHash: "sha256", // 哈希算法
    },
    buffer,
  );
  // 转换为Base64格式返回（便于传输和存储）
  return cipherBuffer.toString("base64");
};

/**
 * RSA 解密（使用私钥解密，只能解密对应公钥加密的内容）
 * @param {string} cipherText 加密后的Base64字符串
 * @param {string} privateKey RSA私钥（PEM格式）
 * @returns {string} 解密后的明文
 */
const rsaDecrypt = (cipherText, privateKey) => {
  // 转换Base64字符串为Buffer
  const cipherBuffer = Buffer.from(cipherText, "base64");
  // 执行RSA解密
  const plainBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // 与加密时填充方式一致
      oaepHash: "sha256", // 与加密时哈希算法一致
    },
    cipherBuffer,
  );
  // 转换为Utf8格式的明文
  return plainBuffer.toString("utf8");
};

// RSA 演示：生成密钥对 + 加密 + 解密
const { publicKey, privateKey } = generateRsaKeyPair(2048);
// 注意：RSA加密有明文长度限制（约为密钥长度/8 - 填充长度），2048位密钥约可加密245字节以内的内容
// 若需加密大文件/长文本，推荐：AES加密原文 + RSA加密AES密钥（混合加密方案）
const rsaPlainText =
  "测试RSA加密：" + JSON.stringify(body_params).substring(0, 100); // 截取部分内容，避免超出长度限制
const rsaCipherText = rsaEncrypt(rsaPlainText, publicKey);
const rsaDecryptText = rsaDecrypt(rsaCipherText, privateKey);

console.log("=== RSA 操作结果 ===");
console.log("生成的公钥：", publicKey);
console.log("生成的私钥：", privateKey);
console.log("加密后的内容：", rsaCipherText);
console.log("解密后的内容：", rsaDecryptText);
console.log("------------------------\n");
