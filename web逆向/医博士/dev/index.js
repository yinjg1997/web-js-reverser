/**
 * 医博士登录验证码处理模块, 没有轨迹校验
 * @module yiboshi-captcha
 * @description 用于处理医博士平台的滑块验证码获取和校验
 * @see https://yngwypt.zmnyjk.com/#/
 */

const SM2 = require("sm-crypto").sm2;
const axios = require("axios").default;

/**
 * 使用 SM2 国密算法加密文本
 * @param {string} originalText - 需要加密的原始文本，格式如 '{"x":211.52941176470588,"y":5}'
 * @returns {string} 加密后的十六进制字符串，以 "04" 开头
 * @example
 * const encrypted = encryptSM2('{"x":211.52941176470588,"y":5}');
 * // 返回: "04a1e2496063c61de590f9253b8bb90b..."
 */
function encryptSM2(originalText) {
    const publicKey = "04182b39fcaa3d111981de100d3742cceae4b94b662352591f2cc33a52d4fce716be9594c60c9c5221fe40751c51cf546ddd406e49c2d259e194f1bcfdf75e8d7a"
    const cipherMode = 1
    const encrypted = SM2.doEncrypt(originalText, publicKey, cipherMode);
    return "04" + encrypted
}

/**
 * 获取滑块验证码
 * @async
 * @returns {Promise<Object>} 验证码数据对象
 * @property {string} secretKey - 加密密钥
 * @property {string} originalImageBase64 - 背景图片的 Base64 编码
 * @property {string} jigsawImageBase64 - 滑块图片的 Base64 编码
 * @property {string} token - 验证码令牌，用于后续校验
 * @example
 * const captcha = await getCaptcha();
 * console.log(captcha.repData.token);
 */
async function getCaptcha() {
    const response = await axios.post(
        "https://lcgwypt-login.zmnyjk.com/captcha/get",
        { captchaType: "blockPuzzle" },
        {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Type": "application/json; charset=UTF-8",
                "Origin": "https://yngwypt.zmnyjk.com",
                "Pragma": "no-cache",
                "Referer": "https://yngwypt.zmnyjk.com/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "sec-ch-ua": '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"'
            }
        }
    );
    return response.data;
}

/**
 * 校验滑块验证码
 * @async
 * @param {string} pointJson - SM2 加密后的滑动坐标点 JSON 字符串
 * @param {string} token - 从 getCaptcha 获取的验证码令牌
 * @returns {Promise<Object>} 校验结果对象
 * @property {boolean} success - 校验是否成功
 * @property {string} repData.captchaVerification - 校验通过后的验证凭证，用于登录接口
 * @example
 * const pointJson = encryptSM2('{"x":211.52941176470588,"y":5}');
 * const result = await checkCaptcha(pointJson, token);
 */
async function checkCaptcha(pointJson, token) {
    const response = await axios.post(
        "https://lcgwypt-login.zmnyjk.com/captcha/v2/check",
        {
            captchaType: "blockPuzzle",
            pointJson: pointJson,
            token: token
        },
        {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Type": "application/json; charset=UTF-8",
                "Origin": "https://yngwypt.zmnyjk.com",
                "Pragma": "no-cache",
                "Referer": "https://yngwypt.zmnyjk.com/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "sec-ch-ua": '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"'
            }
        }
    );
    return response.data;
}

/**
 * 获取并打印验证码信息（测试用）
 * @async
 * @description 获取验证码并打印关键信息，用于调试测试
 */
async function fetchCaptcha() {
    const captcha = await getCaptcha();
    const { secretKey, originalImageBase64, jigsawImageBase64, token } = captcha.repData;
    console.log(`secretKey: ${secretKey}`);
    console.log(`token: ${token}`);
}

fetchCaptcha()
