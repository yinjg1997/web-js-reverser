require("./env.js");
require("./source.js");


const paramsH5sign = {
    'appid': 'search-pc-java',
    'functionId': 'pc_search_searchWare',
    'client': 'pc',
    'clientVersion': '1.0.0',
    't': 1765107920794,
    'body': '3ed8ba0aa925248c6d2ce4baba1cb0e7f9d1b2aa8f5cd6a501f58378508b93d0'
}

function sign(params) {
    const h5st = window.PSign.signSync(params)
    console.log("===========")
    console.log(h5st)
    return h5st
}

module.exports = {
    sign
}
