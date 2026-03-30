require("./env.js");
require("./source.js");

function get_anti_content() {
  const AntiContent = window.wp_loader("fbeZ");
  const t = new AntiContent({
    serverTime: Date.now(),
  });
  return t.messagePack();
}

console.log(get_anti_content());

// let tt,
//   et,
//   rt = function (t) {
//     try {
//       var e = {
//         serverTime: t, // t = (new Date).getTime()  或者 "/api/server/_stm"
//       };
//       return Promise.resolve(
//         Promise.resolve().then(r.t.bind(null, "fbeZ", 7)),
//       ).then(function (t) {
//         // return new (0, t.default)(e).messagePack();
//         return new t.default(e).messagePack();
//       });
//     } catch (n) {
//       return Promise.reject(n);
//     }
//   };

// console.log(new pddEncrypto({ serverTime: 1770616427390 }));
