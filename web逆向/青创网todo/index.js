const { _0x4ac703 } = require("./js_code");
const CryptoJS = require("crypto-js");
const JSEncrypt = require("jsencrypt");

const jse = new JSEncrypt();

// console.log(jse.encrypt("123456"));
// console.log(jse);

// https://hangzhou.qccqcc.com/



// qccppm 来自页面 https://hangzhou.qccqcc.com/ 的 script
var cfgPage = { PlusVipStatus: 0 };
var qccppm =
  "iGM0xZ9bXKZmCYY6gfcfGCylWS6FB6yR|QsIVrNM5UqdhFPqJ|7C2B9F597DF56F9C268992A647867F3C";
var qccrkeys = [
  "0",
  "A7DD7B89A5D13036C80946173A441E75",
  "4",
  "123456",
  "0",
  'OKLGjpWXdJCPEkqzv"-M;y3FGZS\\dGUEDqG!u}miCiHEGxUXdPx7hYorGL1nzfnFm^&o5GNEYyr UKn65EGI<=onf~KkngtQyn9wHVU<na}dZ6R2peKjF\\+!g|iS O}c[VEXqVx?c&oK3vwk!ZblkkkKqiOs&X[:R[ol^\\sH3:Ggd|i{F"*]p3S6Npg0\\o3nK6nYYcNlc-jIq;gKdUU-.mM|GW+;CiPFGJSY+_CS7mPN&_[<\\489NYonRHvFrXM$\\-1|IdF}W:DjuWrJyoO: F5UNm}9Z<zbv|N\\XoRPFK1Smr\\J;wgO)YWlke;y!K7iUmd8m8AG5Yt24Kr}U&-Pc2y6Qa`ONUkkZHZ}d$k}wK3wZ9vLsvyJzNzX_i4w6nw=7kPJ\'6StDFSlS-UO6SMFGXRzosN\\4/L `W{~XT|6|l[,\\|dpToXosEip{5VFH}T&zOKGNELZPJVl[iv[<XWfVkFDiMNNYgpzpefUXBEjh{2ETUI"y#.nOcy3[K=Iq[:[lLkB_[f\\eTOlhR)$VIOOgWo$sK6SKUuM?=ZJV8{Smy6lGzU;jz93hTcjWgHUPyQkdiw?CmETiwgJlSYiggP B/q SNNRQz^Xjt[WZHWod$|K;M4rG_|NkkJSmSqXfZy6w7Uym{Y{R\\4|O8;c=X>;x{yZi<u\\dqCvsR< ?YoWH1s3m hIYkzPh4 n|l+xHerOTc=k:lFg\\jLrqF;gMJYIN@}LysNi{Rvo!Z2jJuL8OKT#2gtgKv=SO"hGqy38vtP -o6nSi7rXw.18c\\ijyY*>oe24VoTxfd?FLdY:ZBXgn2IPqM_#"tl|ld;<?Yly:pr9eN]a\\\\pu9KN!!KS',
  'OKJjSJ>]fYsIVMh<RghHCSXEG=UddJEDlUQKuggOqH2inAY%/7lzE^z?fj,uDCR\\T >j5~G;PgStp,pT1u<9WW(#hl9cKx?=%{Sis:lpMsoe<jtqxk1oQ_rrwg2urX>k[7HF47j"x[/^Rfp8OaqyS86h:zx^wlY=SJ\\^kJf`j[1Tjv RxIRsV8q;i#>$j<{nz4MS$Hp7rGH=ZK$$q}KFDUGK',
  "1",
];


// PUBLIC KEY
_0x556f40 =
  "-----BEGIN\x20PUBLIC\x20KEY-----\x0a" +
  _0x4ac703(
    qccrkeys[6],
    parseInt(qccrkeys[2]),
    parseInt(qccrkeys[3]),
    parseInt(qccrkeys[4]),
  ) +
  "\n-----END PUBLIC KEY-----";

// console.log("_0x556f40: ", _0x556f40);

// 加密明文参数
const params = {
  _0x44593b:
    "https://newopenapiweb.17qcc.com/api/services/app/ProductFactory/GetNewProductCategoryRank",
  _0x506a58: {
    TopN: 10,
    MarketIds: [14, 17],
    OnSaleTimeType: 7,
    ProductTopN: 8,
    IsGetVipPrice: 0,
    IsGetShopOviewInfo: true,
    ProductOrderType: 4,
  },
  _0x545668: {
    dataVer: 0,
  },
};

jse.setPublicKey(_0x556f40);
const _0x41dbfb = jse.encrypt(qccppm["split"]("|")[0])
console.log("_0x41dbfb: ", _0x41dbfb);


// // 发送的加密 payload
// let _0x2be963 = {
//   KM: qccrkeys[1], // 前端script返回
//   Ver: _0x903ee5, // "1" 不变
//   Content: _0x247919,
//   Sign: _0x21c377,
//   RsaPubAes: _0x41dbfb, // WkcMpTm/x8wtNJFj5IQN7YYo2ECYUodUOQ5MXdKcR+KZW/CIVo8NozlPpdp/mTVfndy7URQCEghZl98/iewsV1FAJzfXY4P6NY6YdPaZJKs6klz7QD9+gfgcM5C/FKpyHGVNc1dVf7cs8yZibDf4KDLzIgaBTF3MBhI6klkitPY=
//   IV: qccppm["split"]("|")[1], // 前端script返回
//   TimesTamp: qccppm["split"]("|")[2], // 前端script返回
// };

