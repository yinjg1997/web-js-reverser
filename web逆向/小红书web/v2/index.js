/**
 * 生成链:
 * x-s 基于 a1 生成
 * x-s-common 依赖 a1
 * web-session 依赖 x-s
 * x-s + web-session + x-s-common 进行 homefeed 请求
 *
 * x-s 搜 seccore_signv2
 */
require("./env.js");
// require("./fingerprint.js");
require("./source.js");

// =============== a1 ==================
console.log("\nyuri.loader('61736'): ");
yuri.loader("61736");

const a1_bbb = "Mac OS";

function get_a1(e) {
  const a1 = yuri.generateLocalId(e);
  document.cookie = `a1=${a1};`;
  console.log(`a1: ${a1}`); // 19b8d1c4d0fvr1vlat7n0jcasw421x0a21smo5hwc30000296928
  return a1;
}

const a1 = get_a1(a1_bbb);

// =============== xs ==================
console.log("\nyuri.loader('56406'): ");
yuri.loader("56406");

const xs_eee = "/api/sns/web/v1/login/activate";
const xs_aaa = {};
// const xs_aaa = {
//   cursor_score: "",
//   num: 31,
//   refresh_type: 1,
//   note_index: 25,
//   unread_begin_note_id: "",
//   unread_end_note_id: "",
//   unread_note_count: 0,
//   category: "homefeed_recommend",
//   search_key: "",
//   need_num: 6,
//   image_formats: ["jpg", "webp", "avif"],
//   need_filter_image: false,
// };

function get_xs(api_path, params) {
  const real_xs_length =
    "XYS_2UQhPsHCH0c1Pjh9HjIj2erjwjQhyoPTqBPT49pjHjIj2eHjwjQ+GnPW/MPjNsQhPUHCHfM1qAZlPebKL/Q9LrYFaeYOznF7yrYa2eY8/rkcnLQYpbzs4bqEGfbg2LRiGnD6zfSVPpbr/BQOJbSYpAmI+LEY87YtcSbVpo8owaTd8pmL8Br7LLTIpBTV+/P34SQsqemkprEV/FQFqeSwPAQdG7STJLcIcDS1PgS6aF4YL9MgLMSS+LRfpMY+8FHI89rF2Dq9GFIIGFlLcF4o/BYYcD8kpFSktApCzMSkzgp++/mGznPjNsQh+sHCHfRjyfp04sQR"
      .length;
  console.log("\nreal_xs_length: ", real_xs_length);

  const xs = yuri.seccore_signv2(api_path, params);
  console.log("\nyuri.seccore_signv2: ");
  console.log(xs);
  console.log(xs.length);
  return xs;
}

const xs = get_xs(xs_eee, xs_aaa);

// // =============== xs-common ==================
// yuri.loader("82840");

// let yyy = {
//   s0: 3,
//   s1: "",
//   x0: "1",
//   x1: "4.3.0",
//   x2: "Mac OS",
//   x3: "xhs-pc-web",
//   x4: "5.6.1",
//   // a1
//   x5: a1,
//   // 时间戳
//   x6: "",
//   // xs
//   x7: xs,
//   // todo b1
//   x8: "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSfMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx+PGDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDtIC6eDVw2IENsSqtlnlSuNjVtIvoekqt3cZ7sVo4gIESyIhE2QfquIxhnqz8gIkIfoqwkICZWG73sdlOeVPw3IvAe0fged0EKIi5s3MmD2utAIiKsidvekZNeTPt4nAOeWPwEIvSgz/defuwhLBosDuwmI3YrIxE5Luwwaqw+rekhZANe1MNe0Pw9ICNsVLoeSbIFIkosSr7sVnFiIkgsVVtMIiudqqw+tqtWI30e3PwIIhoe3ut1IiOsjut3wutnsPwXICclI3Ir27lk2I5e1utCIES/IEJs0PtnpYIAO0JeYfD1IErPOPtKoqw3I3OexqtWQL5eiz5sVLlLIE0s6edsiPtzcPwrICJefVwfIkgs60WrICKedo/eWVt3I37eVqwf8BYrIhQuIx5exZ6si00s6I6eSPwaIE8wIvF3pVwZIxcuIiee1mbTyBgeYuw6IEqrmVthySNefANeYqtOeuwpICz5IhkdLVtcGutpICvefb0eVPw/JutfIvMn+PtXI3HItlimIk/sYMJsWrvekVwGHPtrI3HzI37sTPtUIC7edDk6ICbiHeQAIhSFIE0edVwLyPtCZut/IkqZIvoskINskqwdmch3IvIrpPwmBuwKIx4MI3IgIkZ=",
//   x9: 1669426350,
//   x10: 0,
//   x11: "normal",
// };
// function set_x9(obj) {
//   const x6 = obj.x6,
//     x7 = obj.x7,
//     x8 = obj.x8;
//   const x9 = yuri.u("".concat(x6).concat(x7).concat(x8));
//   console.log(`x9::::${x9}`);
//   obj["x9"] = x9;
// }

// function get_xs_common(obj) {
//   set_x9(obj);
//   const XSCommon = yuri.b64Encode(yuri.encodeUtf8(JSON.stringify(yyy)));
//   console.log(`XSCommon: ${XSCommon}`);
//   return XSCommon;
// }
// const xs_common = get_xs_common(yyy);


