require("./env.js")
require("./source.js")


const c = '/api/sns/web/v1/login/activate{}'
const d = "af06df28f7891997e0a713f607576775"
const res = window.mnsv2(c, d)
console.log(res)
console.log(res.length)
