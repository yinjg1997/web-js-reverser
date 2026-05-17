const CryptoJS = require('crypto-js');

function AESencrypt(plaintext, key, iv) {
    return CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(plaintext),
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString();
}

function decrypt(page) {
    let datetime = (new Date()).getTime()
    // let datetime = 1779008602509
    datetime = parseInt(datetime / 1000)
    const datetime_hex = datetime.toString(16)
    const guiji = '719d111,719d111,719u111,719u111'
    const plaintext = page + '|' + guiji
    const key = datetime_hex + datetime_hex
    return {
        'v': AESencrypt(plaintext, key, key),
        't': datetime
    }
}