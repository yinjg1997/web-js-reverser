/**
 * 生成随机 WebID
 * @param {number} c - WebID 的长度，默认 32 位
 * @returns {string} 随机生成的 WebID
 */
function get_webid(c = 32) {
  const s = "abcdef0123456789";
  let webId = "";
  for (let i = 0; i < c; i++) {
    // 生成 0 到 s.length-1 之间的随机整数
    const randomIndex = Math.floor(Math.random() * s.length);
    webId += s[randomIndex];
  }
  return webId;
}