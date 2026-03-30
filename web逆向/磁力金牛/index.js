const crypto = require("crypto");

const x_timestamp = new Date().getTime();
// const esp_sature = {
//   "esp-sature": x_timestamp,
// };
const response = {
  id: "6b11708f41d4661eef66b1a9e33da6ea",
  espsystime: 1770457329712, // info接口拿到espsystime
  accountUcId: 57903154,
};

const esp_TimeOffset = response.espsystime - x_timestamp;
const esp_TimeOffsetId = response.id;

const stamp = x_timestamp + esp_TimeOffset;

let _t = response.accountUcId + "&" + stamp + "&" + esp_TimeOffsetId;
// const Tt = G['hash'](_t);
const esp_sature = crypto.createHash("md5").update(_t).digest("hex");

console.log("x_timestamp:", x_timestamp);
console.log("stamp:", stamp);
console.log("esp_sature:", esp_sature);

const Lt = {
  url: "/report/product/storewide/detailReport",
  method: "post",
  data: {
    groupType: 2,
    selectedColumns: [
      "authorId",
      "costTotal",
      "t0GMVNew",
      "t0RoiNew",
      "t0OrderCntNew",
      "orderCost",
      "adShow",
      "eventGoodsView",
      "itemCardClkCnt",
      "qcpxWhiteboxDirectOrderCnt",
      "qcpxWhiteboxDirectOrderPaymentAmt",
      "netT0GMV",
      "netT0Roi",
      "netT0OrderCnt",
      "directGMV",
      "directOrderCntTotal",
      "directRoi",
      "directOrderCntCost",
      "netDirectGMV",
      "netDirectOrderCnt",
      "netDirectRoi",
      "directAttrSellerNewBuyerCnt",
      "t0ShopNewBuyerOrderCnt",
      "t0ShopNewBuyerOrderPaymentAmt",
      "qcpxDirectAttrSellerNewBuyerCnt",
      "qcpxT0ShopNewBuyerOrderCnt",
      "qcpxT0ShopNewBuyerOrderPaymentAmt",
    ],
    viewType: 1,
    startTime: 1770307200000,
    endTime: 1770393599999,
    sourceBiz: "storewidePromotionProductPromotionData",
    selectors: [],
    pageInfo: {
      currentPage: 2,
      pageSize: 10,
    },
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
    delete: {},
    get: {},
    head: {},
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    put: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    patch: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    requestSource: "PC",
    "x-timestamp": 1770364965747,
    "x-nonce": 0.2594068579651898,
    Accept: "application/json,*/*",
    "X-REQUESTID": "eba84310-56bd-43de-9b67-882d5485e216",
  },
  baseURL: "/rest/esp",
  transformRequest: [null],
  transformResponse: [null],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
  },
  withCredentials: true,
  params: {
    "kuaishou.ad.esp_ph": "42914ae2289047a3af902a41209c8753c19d",
  },
};

// getEspSignature == generateSignature
class ye {
  constructor(ge) {
    const le = {
        V: 638,
        I: "4AHc",
        b: 662,
        e: 97,
        C: 72,
        U: 43,
        T: 354,
        k: "*5m2",
        J: 672,
        Z: 526,
        s: 31,
        S: "f56*",
        v: 226,
        A: 9,
      },
      Ae = {
        V: 178,
        I: 140,
      },
      Pe = {
        V: 386,
        I: 499,
      },
      De = {
        V: 53,
        I: 89,
      },
      Je = {};
    function He(ke, $e, Ke, Fe, Le) {
      return we(Ke, $e - 182, Ke - De.V, Fe - De.I, $e - 870);
    }
    Je["KtUXs"] = function (ke, $e) {
      return ke || $e;
    };
    function Ue(ke, $e, Ke, Fe, Le) {
      return U(ke - Pe.V, $e - Pe.I, Ke - 477, Ke - -568, $e);
    }
    const qe = Je;
    this["radar"] = null;
    function nt(ke, $e, Ke, Fe, Le) {
      return U(ke - 371, $e - Ae.V, Ke - Ae.I, $e - -422, Ke);
    }
    this["radar"] = qe["KtUXs"](ge, null);
  }
  ["generateSignature"](ge, le) {
    const Ae = {
        V: 759,
        I: 568,
        b: 606,
        e: 659,
        C: "4AHc",
        U: 821,
        T: 842,
        k: 1136,
        J: 530,
        Z: 347,
        s: "E^(g",
        S: 310,
        v: 817,
        A: 944,
        c: 645,
        j: 784,
        m: "^INF",
        H: 418,
        B: "mn9^",
        P: 253,
        Y: 252,
        p: 43,
        u: 777,
        q: 467,
        w: 465,
        h: "5HBE",
        y: 275,
        x: "*5m2",
        X: 138,
        N: 832,
        f: 551,
        g: 258,
        o: "F$72",
        E: 90,
        K: 82,
        W: 25,
        z: "f56*",
        Q: 531,
        M: 528,
        i: "3uH7",
        d: 437,
        O: 102,
        D: 554,
        l: 318,
        a: 257,
        L: "sFea",
        r: 197,
        F: "x%((",
        R: 0,
        n: 324,
        G0: 802,
        G1: 583,
        G2: 452,
        G3: "$uvm",
        G4: 50,
        G5: 367,
        G6: 17,
        G7: 823,
        G8: 603,
        G9: "mn9^",
        GG: 255,
        Gt: 314,
        GV: 357,
        GI: 264,
        Gb: 34,
        Ge: "C!b]",
        GC: 359,
        GU: 315,
        GT: "yy]T",
        Gk: 317,
        GJ: 381,
        GZ: 151,
        Gs: 404,
        bT: 406,
        bk: 368,
        bJ: "h7U$",
        bZ: 782,
        bs: 828,
        bS: "ks]C",
        bv: 796,
        bA: 1063,
        bc: 1323,
        bj: "JEO[",
        bm: 517,
        bH: 594,
        bB: 579,
        bP: 298,
        bY: 429,
        bp: 520,
        bu: 360,
        bq: 630,
        bw: 1442,
        bh: 1453,
        by: 1318,
        bx: "GTBT",
        bX: 136,
        bN: 325,
        bf: 51,
        bg: 242,
        bo: "R0Bl",
        bE: 855,
        bK: 426,
        bW: 595,
        bz: 578,
        bQ: "4AHc",
        bM: 175,
        bi: 129,
        bd: "#Z%#",
        bO: 275,
        bD: 223,
        bl: 717,
        ba: 834,
        bL: 403,
        br: 537,
        bF: 697,
        bR: 914,
        bn: 1156,
        e0: 1095,
        e1: 384,
        e2: 268,
        e3: 610,
        e4: 600,
        e5: 965,
        e6: 637,
        e7: "E^(g",
        e8: 174,
        e9: 136,
        eG: 835,
        et: 958,
        eV: "z0#b",
        eI: 442,
        eb: 551,
        ee: 250,
        eC: 361,
        eU: 624,
        eT: "]j7P",
        ek: 225,
        eJ: 573,
        eZ: 54,
        es: "4AHc",
        eS: 63,
        ev: 181,
        eA: 79,
        ec: 184,
        ej: 101,
        em: "!y)Q",
        eH: 228,
        eB: 665,
        eP: 413,
        eY: 561,
        ep: 147,
        eu: "0@&3",
        eq: 36,
        ew: 5,
        eh: 210,
        ey: "x%((",
        ex: 322,
        eX: 379,
        eN: 591,
        ef: 374,
        eg: 145,
        eo: 398,
        eE: 362,
        eK: 874,
        eW: "f56*",
        ez: 631,
        eQ: 730,
        eM: 832,
        ei: 646,
        ed: 231,
        eO: 557,
        eD: 505,
        el: 514,
        ea: 397,
        eL: 354,
        er: "R0Bl",
        eF: 509,
        eR: 701,
        en: 400,
        C0: 660,
        C1: "GTBT",
        C2: "Q1us",
        C3: 102,
        C4: 339,
        C5: 3,
        C6: 254,
        C7: 434,
        C8: 1007,
        C9: 829,
        CG: 627,
        Ct: "#Z%#",
        CV: 744,
        CI: 395,
        Cb: 506,
        Ce: 810,
        CC: "ks]C",
        CU: 482,
        CT: 266,
        Ck: 389,
        CJ: "D7Xs",
        CZ: 724,
        Cs: 875,
        CS: 1282,
        Cv: 1306,
        CA: 1041,
        Cc: 812,
        Cj: 348,
        Cm: 523,
        CH: 534,
        CB: 564,
        CP: 769,
        CY: 803,
        Cp: 537,
        Cu: 753,
        Cq: "KKvt",
        Cw: 687,
        Ch: 913,
        Cy: 1147,
        Cx: "KKvt",
        CX: 666,
        CN: 952,
        Cf: 311,
        Cg: 620,
        Co: 788,
        CE: 520,
        CK: 837,
        CW: "0@&3",
        Cz: 295,
        CQ: 130,
        CM: 292,
        Ci: 448,
        Cd: 121,
        CO: "ZD^[",
        CD: 68,
        Cl: 147,
        Ca: 696,
        CL: 751,
        Cr: 736,
        CF: 503,
        CR: 536,
        Cn: 331,
        U0: 763,
        U1: 769,
        U2: 955,
        U3: "0@&3",
        U4: 727,
        U5: 236,
        U6: 596,
        U7: 741,
        U8: 866,
        U9: 546,
        UG: 896,
        Ut: "jDsG",
        UV: 1061,
        UI: 1010,
        Ub: "sFea",
        Ue: 951,
        UC: 779,
        UU: 804,
        UT: 1339,
        Uk: 1286,
        UJ: 1400,
        UZ: 142,
        Us: 83,
        US: 273,
        Uv: 398,
        UA: 170,
        Uc: 13,
        Uj: 297,
        Um: 523,
        UH: 685,
        UB: 383,
        UP: 776,
        UY: 678,
        Up: 720,
        Uu: 747,
        Uq: 531,
        Uw: 444,
        Uh: 752,
        Uy: "KKvt",
        Ux: 1023,
        UX: 1127,
        UN: 1296,
        Uf: "jDsG",
        Ug: 450,
        Uo: 179,
        UE: ")P*(",
        UK: 276,
        UW: 483,
        Uz: 1057,
        UQ: 798,
        UM: 791,
        Ui: 631,
        Ud: 446,
        UO: 427,
        UD: 703,
        Ul: "t3DS",
        Ua: 458,
        UL: 452,
        Ur: 560,
        UF: 225,
        UR: 316,
        Un: 68,
        T0: 262,
        T1: 677,
        T2: 1273,
        T3: 1001,
        T4: 1309,
        T5: 1014,
        T6: "4AHc",
        T7: 167,
        T8: 291,
        T9: 86,
        TG: "XMJl",
        Tt: 372,
        TV: 621,
        TI: 468,
        Tb: 77,
        Te: 388,
        TC: 177,
        TU: 426,
        TT: 376,
        Tk: 1091,
        TJ: 1211,
        TZ: 931,
        Ts: 1079,
        TS: "rCzN",
        Tv: "70s3",
        TA: 10,
        Tc: 49,
        Tj: 320,
        Tm: 444,
        TH: 522,
        TB: 424,
        TP: "3Dfs",
        TY: 54,
        Tp: 28,
        Tu: 227,
        Tq: 85,
        Tw: 1042,
        Th: 1159,
        Ty: 1004,
        Tx: 27,
        TX: 28,
        TN: 57,
        Tf: 1029,
        Tg: 772,
        To: "kwOf",
        TE: 1117,
        TK: 1217,
        TW: 1045,
        Tz: 1390,
        TQ: "yxt&",
        TM: 669,
        Ti: 689,
        Td: 373,
        TO: 122,
        TD: 186,
        Tl: "70s3",
        Ta: "f56*",
        TL: 279,
        Tr: 1003,
        TF: 1090,
        TR: 985,
        Tn: 1068,
        k0: "IOLT",
      },
      Pe = {
        V: 367,
      },
      De = {
        V: 66,
        I: 82,
        b: 399,
        e: 144,
      },
      Je = {
        V: 463,
        I: 129,
        b: 286,
      },
      He = {
        V: 321,
        I: 180,
        b: 116,
      },
      Ue = {
        V: 400,
        I: 232,
        b: 162,
      };
    function qe(Ft, Ct, Sn, sn, tn) {
      return we(Ct, Ct - Ue.V, Sn - 169, sn - Ue.I, Sn - Ue.b);
    }
    function nt(Ft, Ct, Sn, sn, tn) {
      return me(Ft - He.V, Sn - He.I, tn);
    }
    const ke = {
      rGAgo: function (Ft, Ct) {
        return Ft == Ct;
      },
      aofvH: "5|2|1|4|3|0",
      VitTa: "Micro",
      xykxE: nt(Ae.A, 426, Ae.c, Ae.j, Ae.m),
      Orytz: qe(-Ae.H, Ae.B, -Ae.P, -Ae.Y) + "e",
      phCUB: nt(Ae.u, Ae.q, 604, Ae.w, Ae.h) + "e",
      kNzGl: qe(Ae.y, Ae.x, 60, -Ae.X) + "wn",
      KXnKq: nt(Ae.N, 285, Ae.f, Ae.g, Ae.o) + "E",
      JGqXY: $e(-Ae.E, -232, Ae.K, Ae.W, Ae.z) + "e",
      EaCkx: Ke(-Ae.Q, -Ae.M, Ae.i) + "t\uFF1A",
      UWZFE: function (Ft, Ct) {
        return Ft !== Ct;
      },
      lUAos: $e(Ae.O, Ae.D, Ae.l, Ae.a, Ae.L),
      LQiMD: Ke(-Ae.r, 68, Ae.F),
      IUJkU: function (Ft) {
        return Ft();
      },
      vnNnk: function (Ft, Ct, Sn) {
        return Ft(Ct, Sn);
      },
      Kaoni:
        nt(Ae.n, Ae.G0, Ae.G1, Ae.G2, Ae.G3) +
        $e(Ae.G4, Ae.G5, 154, -Ae.G6, Ae.C) +
        $e(827, Ae.G7, 531, Ae.G8, Ae.G9),
      CBBIp:
        Ke(-149, -Ae.GG, "]j7P") +
        Ke(-Ae.GI, Ae.Gb, Ae.Ge) +
        Ke(-332, -Ae.GU, Ae.GT),
      PSBsR:
        $e(Ae.GZ, Ae.Gs, Ae.bT, Ae.bk, Ae.bJ) +
        $e(Ae.bZ, Ae.bs, 514, 257, Ae.bS) +
        "p",
      LzwDN: function (Ft, Ct, Sn) {
        return Ft(Ct, Sn);
      },
      yjDLp:
        ct(Ae.bv, Ae.bA, 1075, Ae.bc, Ae.bj) +
        Ke(-730, -Ae.bm, "x%((") +
        $e(124, 80, Ae.bP, Ae.bY, Ae.C),
      zczYJ: function (Ft, Ct) {
        return Ft + Ct;
      },
      VcTBb:
        $e(Ae.bp, 257, Ae.bu, Ae.bq, "!y)Q") +
        ct(Ae.bw, 1168, Ae.bh, Ae.by, Ae.bx) +
        $e(Ae.bX, Ae.bN, Ae.bf, -Ae.bg, Ae.bo) +
        "d",
      kgQbY: function (Ft, Ct) {
        return Ft + Ct;
      },
      SdWfc:
        nt(Ae.bE, Ae.bK, Ae.bW, Ae.bz, Ae.bQ) +
        Ke(-Ae.bM, -Ae.bi, Ae.bd) +
        "rc",
      lCPmC:
        nt(645, 592, 555, Ae.bl, "*5m2") +
        $e(Ae.ba, Ae.bL, Ae.br, Ae.br, "rCzN") +
        "rm",
      EpcJU: ct(Ae.bF, Ae.bR, Ae.bn, Ae.e0, "Asq4"),
      Bxafh: function (Ft, Ct) {
        return Ft !== Ct;
      },
      jfOzt: Ke(-Ae.e1, -609, "4AHc"),
      YtoEU: ct(Ae.e4, 817, Ae.e5, Ae.e6, Ae.e7),
      iUDIF:
        qe(-Ae.e8, "f56*", -318, -Ae.e9) +
        ct(Ae.eG, 1083, Ae.et, 1104, Ae.eV) +
        "st",
      CpVSJ: function (Ft, Ct) {
        return Ft !== Ct;
      },
      WTSZL: Ke(-Ae.eI, -Ae.eb, "KKvt"),
    };
    function $e(Ft, Ct, Sn, sn, tn) {
      return ne(Ft - 296, tn, Sn - -Je.V);
    }
    function Ke(Ft, Ct, Sn, sn, tn) {
      return _e(Sn, Ct - De.V, Ft - -De.I);
    }
    const {
      getId: Fe,
      platform: Le,
      entrySrc: Ye,
      signatureKey: at,
      isTest: rt = ![],
    } = le;
    function ct(Ft, Ct, Sn, sn, tn) {
      return ne(Ft - 3, tn, Ct - Pe.V);
    }
    try {
      if (true) {
        const Ft = 57903154, // account id
          Ct = false,
          Sn = ge["headers"]["x-timestamp"] || Se(),
          sn = window.esp_TimeOffset || 4269 * 1 + -95 * 51 + 96 * 6,
          tn = Sn + sn;
        let _t = Ft + "&" + tn;
        window.esp_TimeOffsetId && (_t += "&" + window.esp_TimeOffsetId);
        // const Tt = G['hash'](_t);
        const Tt = crypto.createHash("md5").update(_t).digest("hex");
        if (
          ((ge["headers"]["esp-entrySrc"] = Ye),
          (ge["headers"]["esp-platform"] = Le),
          (ge["headers"]["stamp"] = tn),
          (ge["headers"]["esp-sature"] = Tt),
          Ct)
        )
          if (true)
            ((ge["headers"]["esp-ref-test"] = window["location"]["href"]),
              (ge["headers"]["esp-sature-test"] = _t),
              (ge["headers"]["esp-sature-offset"] = sn));
          else {
            if (false) return;
            Le = Ye[at[Ft]];
          }
        return ge["headers"] || {};
      } else {
        const Ft =
          ke[Ke(-Ae.Ug, -Ae.Uo, Ae.UE, -Ae.UK, -Ae.UW)][
            ct(Ae.Uz, Ae.UQ, 1067, Ae.UM, "yy]T")
          ]("|");
        let Ct = -35 * 251 + 427 * -11 + 13482;
        for (; []; ) {
          switch (Ft[Ct++]) {
            case "0":
              return S;
            case "1":
              at[ke[nt(Ae.Ui, Ae.Ud, Ae.UO, Ae.UD, Ae.Ul)]] =
                ke[Ke(-Ae.Ua, -319, "t3DS", -Ae.UL, -Ae.Ur)];
              continue;
            case "2":
              Ye[ke[$e(Ae.UF, 572, Ae.UR, Ae.Un, "*5m2")]] =
                ke[$e(Ae.T0, Ae.bH, 530, Ae.T1, Ae.Ct)];
              continue;
            case "3":
              s[ke[ct(Ae.T2, Ae.T3, Ae.T4, Ae.T5, Ae.T6)]] =
                ke[$e(Ae.T7, 249, Ae.T8, Ae.T9, Ae.TG)];
              continue;
            case "4":
              Z[ke[qe(-Ae.eF, "jDsG", -Ae.Tt, -Ae.TV, -Ae.TI)]] =
                ke[$e(Ae.Tb, Ae.bN, Ae.Te, Ae.Cf, Ae.eT)];
              continue;
            case "5":
              Le.PC = "pc";
              continue;
          }
          break;
        }
      }
    } catch (Ft) {
      if (
        ke[Ke(-Ae.TC, -Ae.TU, "z0#b")](
          ke[nt(Ae.Tk, Ae.TJ, Ae.TZ, Ae.Ts, Ae.TS)],
          ke[qe(Ae.e9, Ae.Tv, Ae.TA, Ae.Tc)],
        )
      ) {
        const Ct =
            (Ye &&
              at[
                $e(Ae.Tm, 612, Ae.TH, Ae.TB, Ae.TP) +
                  qe(Ae.TY, "ZgM9", Ae.Tp, -Ae.Tu)
              ](Z)) +
            "&" +
            s,
          Sn = {};
        return (
          (Sn[ct(905, Ae.Tw, Ae.Th, Ae.Ty, Ae.em)] = v),
          (Sn[Ke(-183, Ae.Tx, "yxt&")] = Ct),
          (Sn.v = A),
          this[ct(Ae.Tf, Ae.Tg, 464, 909, Ae.To) + "g"][
            ct(Ae.TE, Ae.TK, Ae.TW, Ae.Tz, Ae.TQ) + "t"
          ] &&
            S[qe(-Ae.TM, Ae.CO, -Ae.H, -Ae.Ti)](
              ke[$e(Ae.TO, Ae.TD, -15, 95, Ae.Tl)],
              Sn,
            ),
          Ct
        );
      } else {
        console[Ke(-485, -Ae.e6, Ae.Ta)](Ft);
        const Ct = {};
        return ((Ct[ct(Ae.Tr, Ae.TF, Ae.TR, Ae.Tn, Ae.k0) + "r"] = {}), Ct);
      }
    }
  }
}
function me(de, ge, le, Ae, Pe) {
  return ae(
    ge -
      -{
        V: 38,
      }.V,
    le,
  );
}
const Ee = (de, ge) => {
    const le = {
        V: 498,
        I: "Q1us",
        b: 197,
        e: 227,
        C: 338,
        U: 24,
        T: 249,
        k: 209,
        J: 768,
        Z: 502,
        s: 1367,
        S: 1462,
        v: 1297,
        A: "3Dfs",
        c: 270,
        j: 583,
        m: 351,
        H: "3Dfs",
        B: "0@&3",
        P: 358,
        Y: 747,
        p: 202,
        u: "P*Nl",
        q: 440,
        w: 649,
        h: 363,
        y: 339,
        x: 485,
        X: 425,
        N: 500,
        f: "9fgi",
        g: 1244,
        o: 1714,
        E: 1417,
        K: 1195,
        W: "ZgM9",
        z: "yy]T",
        Q: 22,
        M: 50,
        i: 262,
        d: 140,
        O: 407,
        D: 118,
        l: "4AHc",
        a: 1502,
        L: 1727,
        r: 1415,
        F: 90,
        R: 295,
        n: 180,
        G0: 312,
        G1: 61,
        G2: 194,
        G3: 340,
        G4: "kwOf",
        G5: "$uvm",
        G6: 135,
        G7: 1073,
        G8: "nELN",
        G9: 778,
        GG: 999,
        Gt: 878,
        GV: 890,
        GI: 991,
        Gb: 325,
        Ge: 459,
        GC: 137,
        GU: 413,
        GT: 562,
        Gk: "70s3",
        GJ: 373,
        GZ: 285,
        Gs: 258,
        bo: 308,
        bE: 9,
        bK: "K[A%",
        bW: 229,
        bz: 360,
        bQ: 518,
        bM: 267,
        bi: "ZgM9",
        bd: 536,
        bO: 598,
        bD: "JEO[",
        bl: 815,
        ba: 459,
        bL: 1594,
        br: 1276,
        bF: 1031,
        bR: "!y)Q",
        bn: 174,
        e0: 255,
        e1: 3,
        e2: "jDsG",
        e3: 132,
        e4: 68,
        e5: 280,
        e6: "F$72",
        e7: 562,
        e8: 408,
        e9: 274,
        eG: 1448,
        et: 1690,
        eV: 1684,
        eI: 1373,
        eb: 1668,
        ee: 1920,
        eC: 148,
        eU: 347,
        eT: 164,
        ek: 76,
        eJ: 678,
        eZ: "XMJl",
        es: 5,
        eS: "XMJl",
        ev: 15,
        eA: "3uH7",
        ec: 704,
        ej: "yYsL",
        em: 744,
        eH: 383,
        eB: "rCzN",
        eP: 498,
        eY: 411,
        ep: 599,
        eu: 422,
        eq: 313,
        ew: 662,
        eh: 483,
        ey: "GTBT",
        ex: 354,
        eX: 524,
        eN: 73,
        ef: 317,
        eg: "^INF",
        eo: 104,
        eE: 76,
        eK: 243,
        eW: 1525,
        ez: 1493,
        eQ: 1565,
        eM: 1767,
        ei: "D7Xs",
        ed: 933,
        eO: 674,
        eD: 802,
        el: 848,
        ea: "^INF",
        eL: 69,
        er: "#Z%#",
        eF: 396,
        eR: 39,
        en: 580,
        C0: 447,
        C1: 567,
        C2: 739,
        C3: 1474,
        C4: 1576,
        C5: 1689,
        C6: 1785,
        C7: "mn9^",
        C8: 168,
        C9: 142,
        CG: 392,
        Ct: 756,
        CV: "5HBE",
        CI: 635,
        Cb: 934,
        Ce: "yxt&",
        CC: "5HBE",
        CU: 659,
        CT: 354,
        Ck: 554,
        CJ: 129,
        CZ: 58,
        Cs: "Asq4",
        CS: 179,
        Cv: 66,
        CA: 48,
        Cc: 59,
        Cj: 1428,
        Cm: 1266,
        CH: 1369,
        CB: "yy]T",
        CP: 382,
        CY: 187,
        Cp: 365,
        Cu: "KKvt",
        Cq: 468,
        Cw: 664,
        Ch: "F$72",
        Cy: 927,
        Cx: 793,
        CX: 1,
        CN: 48,
        Cf: 223,
        Cg: 198,
        Co: 171,
        CE: 6,
        CK: 245,
        CW: 339,
        Cz: 423,
        CQ: 513,
        CM: 131,
        Ci: 390,
        Cd: "]j7P",
        CO: 203,
        CD: 322,
        Cl: 77,
        Ca: 142,
        CL: 388,
        Cr: "ZD^[",
        CF: 1916,
        CR: 1584,
        Cn: 1536,
        U0: 564,
        U1: 553,
        U2: 645,
        U3: "wbNK",
        U4: 1337,
        U5: 1503,
        U6: 1755,
        U7: "ZD^[",
        U8: 214,
        U9: 41,
        UG: 237,
        Ut: "^INF",
        UV: 364,
        UI: 397,
        Ub: 508,
        Ue: 375,
        UC: 404,
        UU: 282,
        UT: "E^(g",
        Uk: 334,
        UJ: 23,
        UZ: 110,
        Us: 248,
        US: 130,
        Uv: "!Wj%",
        UA: 321,
        Uc: 99,
        Uj: "f56*",
        Um: 196,
        UH: 1725,
        UB: 1756,
        UP: 1739,
        UY: 144,
        Up: "jDsG",
        Uu: 269,
        Uq: "yy]T",
        Uw: 482,
        Uh: 885,
        Uy: 1953,
        Ux: 1650,
        UX: 1498,
        UN: 1571,
        Uf: 1653,
        Ug: 442,
        Uo: 207,
        UE: 67,
        UK: 831,
        UW: 604,
        Uz: 679,
        UQ: 421,
        UM: 18,
        Ui: "yxt&",
        Ud: 259,
        UO: 264,
        UD: "C!b]",
        Ul: 458,
        Ua: 133,
        UL: 752,
        Ur: "sVxO",
        UF: 1062,
        UR: 454,
        Un: 156,
        T0: 142,
        T1: 64,
        T2: 479,
        T3: 399,
        T4: 70,
        T5: "!Wj%",
        T6: 333,
        T7: 535,
        T8: 299,
        T9: "GTBT",
        TG: 252,
        Tt: 646,
        TV: 252,
        TI: 577,
        Tb: 675,
        Te: "F$72",
        TC: 487,
        TU: 782,
        TT: 1557,
        Tk: 1674,
        TJ: 1583,
        TZ: 36,
        Ts: 90,
        TS: 381,
        Tv: "sFea",
        TA: 2,
        Tc: 124,
        Tj: 207,
        Tm: 116,
        TH: "P*Nl",
        TB: 169,
        TP: 27,
        TY: 282,
        Tp: 103,
        Tu: 502,
        Tq: 349,
        Tw: 187,
        Th: 16,
        Ty: "Asq4",
        Tx: 412,
        TX: 620,
        TN: 621,
        Tf: 783,
        Tg: 624,
        To: 817,
        TE: 730,
        TK: 30,
        TW: 696,
        Tz: "GTBT",
        TQ: 527,
        TM: 802,
        Ti: "XMJl",
        Td: 145,
        TO: 580,
        TD: 424,
        Tl: 460,
        Ta: 268,
        TL: 352,
        Tr: 449,
        TF: "Q1us",
        TR: 210,
        Tn: 269,
        k0: 471,
        k1: 401,
        k2: 252,
        k3: 356,
        k4: 380,
        k5: 320,
        k6: 515,
        k7: "D7Xs",
        k8: 309,
        k9: 152,
        kG: "yYsL",
        kt: 342,
        kV: 696,
        kI: 1746,
        kb: 1500,
        ke: 1809,
        kC: "x%((",
        kU: 63,
        kT: 88,
        kk: 89,
        kJ: 685,
        kZ: "R0Bl",
        ks: 443,
        kS: "E^(g",
        kv: 506,
        kA: 413,
        kc: 601,
        kj: 512,
        km: 732,
        kH: 54,
        kB: 169,
        kP: 8,
        kY: "Asq4",
        kp: 217,
        ku: 327,
        kq: "R0Bl",
        kw: 465,
        kh: 161,
        ky: 624,
        kx: 342,
        kX: 127,
        kN: 628,
        kf: 451,
        kg: "D7Xs",
        ko: 228,
        kE: 1143,
        kK: 1480,
        kW: 1420,
        kz: "D7Xs",
        kQ: 88,
        kM: 438,
        ki: "0@&3",
        kd: 445,
        kO: 57,
        kD: 150,
        kl: 457,
        ka: 63,
        kL: 183,
        kr: "t3DS",
        kF: 156,
        kR: 65,
        kn: 114,
        J0: 610,
        J1: 684,
        J2: "jC%v",
        J3: 165,
        J4: 54,
        J5: 166,
        J6: 1648,
        J7: 1427,
        J8: 1639,
        J9: 1745,
        JG: 1494,
        Jt: 1575,
        JV: 1041,
        JI: 726,
        Jb: 937,
        Je: "YfPX",
        JC: 451,
        JU: 196,
        JT: 131,
        Jk: 8,
        JJ: 276,
        JZ: 84,
        Js: 225,
        JS: 35,
        Jv: "h7U$",
        JA: 340,
        Jc: 61,
        Jj: 74,
        Jm: "ks]C",
        JH: 78,
        JB: 337,
        JP: 122,
        JY: 430,
        Jp: 464,
        Ju: 470,
        Jq: "3uH7",
        Jw: 608,
        Jh: 154,
        Jy: 54,
        Jx: 219,
        JX: 472,
        JN: 721,
        Jf: 230,
        Jg: 807,
        Jo: 497,
        JE: 711,
        JK: 503,
        JW: 416,
        Jz: 144,
        JQ: 241,
        JM: 172,
        Ji: 367,
        Jd: 564,
        JO: 512,
        JD: 358,
        Jl: "P*Nl",
        Ja: 426,
        JL: 297,
        Jr: 279,
        JF: 293,
        JR: 523,
        Jn: 244,
        Z0: 236,
        Z1: 195,
        Z2: "x%((",
        Z3: 270,
        Z4: 305,
        Z5: 432,
        Z6: 337,
        Z7: 311,
        Z8: 193,
        Z9: 360,
        ZG: "kwOf",
        Zt: 384,
        ZV: 153,
        ZI: 254,
        Zb: "#Z%#",
      },
      Ae = {
        V: 172,
        I: 42,
        b: 994,
      },
      Pe = {
        V: 204,
        I: 121,
        b: 456,
      },
      De = {
        V: 388,
        I: 789,
        b: 359,
        e: 271,
      },
      Je = {
        V: 502,
        I: 612,
        b: 651,
        e: 294,
        C: 123,
        U: "z0#b",
        T: 218,
        k: 318,
        J: 42,
        Z: "nELN",
        s: 128,
        S: 147,
      },
      He = {
        V: 272,
        I: 579,
        b: 31,
      },
      Ue = {
        V: 379,
        I: 424,
      },
      qe = {
        EzSel: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        nRWGq:
          nt(318, le.V, le.I) +
          ke(le.C, le.U, le.T, "XMJl") +
          ke(735, le.J, le.Z, "ZgM9") +
          $e(le.s, le.S, 1350, le.v, le.A),
        eUtcG:
          Ke(-le.c, -le.j, -le.m, -299, le.H) +
          Fe(le.B, -le.P, -le.Y, -le.p, -466),
        TFLbt:
          Fe(le.u, -le.q, -le.w, -582, -le.h) +
          Ke(-le.y, -le.x, -le.X, -le.N, le.f) +
          "\uFF1A",
        CwDbY: $e(le.g, le.o, le.E, le.K, le.W) + "d",
        qMFli: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        ncWVG: Fe(le.z, -471, le.Q, le.M, -le.i),
        oBpGm: function (Le, Ye) {
          return Le === Ye;
        },
        NfYLl: ke(-le.d, le.O, le.D, le.l),
        dZzsN:
          $e(1987, le.a, le.L, le.r, le.f) +
          ke(-le.F, le.R, le.n, "Q1us") +
          ke(le.G1, le.G2, le.G3, le.G4),
        EyiDr: function (Le, Ye) {
          return Le === Ye;
        },
        BWtBt: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        QNrhL: nt(110, 269, le.G5),
        ffeej: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        SaVpN: nt(le.G7, 844, le.G8) + nt(le.Gt, le.GV, "ZgM9") + "et",
        PCzid: function (Le, Ye) {
          return Le !== Ye;
        },
        gFVXk: Ke(-310, -le.Gb, -le.Ge, -le.GC, le.z),
        dllNa: nt(le.GU, le.GT, "4AHc"),
        cbJtW: function (Le) {
          return Le();
        },
        QIEpy: function (Le, Ye) {
          return Le - Ye;
        },
        dDoZh: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        QaUJz:
          Fe(le.Gk, -le.GJ, -le.GZ, -532, -le.Gs) +
          ke(le.bo, le.bE, 213, le.bK),
        AxkCq: Ke(-le.bz, -le.Ge, -le.bQ, -le.bM, le.bi),
        dGafp: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        gdfHK: function (Le, Ye, at) {
          return Le(Ye, at);
        },
        fVAnt:
          nt(le.bd, le.bO, le.bD) +
          $e(1079, le.bL, le.br, le.bF, le.B) +
          Fe(le.bR, le.bn, -le.e0, -317, le.e1),
        rwlsb: Fe(le.e2, -87, -503, -le.e3, -366),
        BkGHu: ke(le.e4, 206, le.e5, le.e6),
        ULNWP: ke(le.e7, 495, le.e8, le.u) + ":",
        VjrwF: $e(le.eG, le.et, le.eV, 1691, le.bK) + "w:",
        teEzr:
          $e(le.eI, 1926, le.eb, le.ee, "z0#b") + ke(le.eC, le.eU, le.eT, le.I),
        QRLzl: function (Le, Ye) {
          return Le === Ye;
        },
        fpFXt: nt(le.eJ, 396, le.eZ),
        nfwgo: ke(-16, le.es, 209, le.eS),
        ALNsg:
          ke(230, 457, 216, le.eA) +
          nt(893, le.ec, le.ej) +
          nt(le.eH, 572, le.eB) +
          ke(le.eY, le.ep, le.eu, "x%((") +
          "d",
        yCbIm: function (Le, Ye) {
          return Le !== Ye;
        },
        yBuwc: nt(le.ew, le.eh, le.ey),
        DoSuq: ke(le.eX, le.eN, le.ef, le.eg),
        LDRtR:
          ke(177, le.eE, 97, "YfPX") +
          $e(le.eW, le.ez, le.eQ, le.eM, le.ei) +
          ":",
        TUdcP: function (Le, Ye) {
          return Le(Ye);
        },
      };
    function nt(Le, Ye, at, rt, ct) {
      return me(Le - Ue.V, Ye - 116, at);
    }
    function ke(Le, Ye, at, rt, ct) {
      return _e(rt, Ye - He.V, at - He.I);
    }
    try {
      if (
        de[
          Ke(-le.ed, -le.eO, -le.eD, -le.el, le.ea) +
            nt(le.eL, le.ef, le.er, le.eF, le.eR)
        ]
      )
        if (
          qe[Ke(-le.en, -le.C0, -le.C1, -le.C2, "t3DS")](
            qe[$e(le.C3, le.C4, le.C5, le.C6, "]j7P")],
            qe[Fe(le.C7, -le.C8, -66, -205, -le.C9)],
          )
        ) {
          const Le = qe[Ke(-le.CG, -600, -412, -le.Ct, le.CV)](Se),
            Ye = qe[Ke(-340, -le.CI, -623, -le.Cb, le.Ce)](
              de[
                Fe(le.CC, -le.CU, -le.CT, -le.Ck, -546) +
                  ke(83, le.CJ, le.CZ, le.Cs, -le.CS)
              ],
              Le,
            );
          if (
            (((qe[ke(le.Cv, -253, le.CA, le.eS, le.Cc)](
              V,
              qe[$e(1437, le.Cj, le.Cm, le.CH, le.CB)](
                V,
                window,
                qe[Ke(-le.CP, -le.CY, -le.Ge, -le.Cp, le.Cu)],
              ),
              qe[nt(le.Cq, le.Cw, le.Ch, le.Cy, le.Cx)],
            ) &&
              qe[ke(222, 357, 296, "h7U$", le.CX)](
                V,
                qe[Fe(le.er, -le.CN, le.eE, -le.Cf, -le.Cg)](
                  V,
                  window,
                  qe[ke(le.Co, le.CE, le.CK, "#Z%#", le.CW)],
                ),
                qe[Fe(le.Gk, -le.Cz, -le.CQ, -le.CM, -le.Ci)],
              )[
                Fe(le.Cd, le.CO, -le.CD, le.Cl, -9) +
                  ke(le.Ca, le.CL, 234, le.Cr, 407)
              ](qe[$e(le.CF, le.CR, 1633, le.Cn, "#Z%#")])) ||
              ![]) &&
              (console[Ke(-le.U0, -le.U1, -le.U2, -627, le.U3)](
                qe[$e(le.U4, 1563, le.U5, le.U6, "ZD^[")],
                de[
                  ke(401, 166, le.GC, le.U7, 3) +
                    ke(le.U8, -le.U9, le.UG, le.Ut, le.UV)
                ],
              ),
              console[nt(le.UI, le.Ub, "yxt&", le.Ue, 701)](
                qe[nt(le.UC, le.UU, le.UT, le.Uk, -le.UJ)],
                Le,
              ),
              console[Ke(-353, -le.UZ, -le.Us, -le.US, le.Uv)](
                qe[ke(-le.es, le.UA, le.Uc, le.Uj, -le.Um)],
                Ye,
              ),
              console[$e(1964, le.UH, le.UB, le.UP, le.bK)](
                qe[ke(287, 426, le.UY, le.Up, le.Uu)],
                window,
              )),
            qe[nt(895, 639, le.Uq, le.Uw, le.Uh)](
              typeof window,
              qe[$e(le.S, le.Uy, le.Ux, le.UX, le.bD)],
            ))
          )
            if (
              qe[$e(le.UN, 1885, le.Uf, le.UX, "0@&3")](
                qe[ke(147, le.Ug, le.Uo, le.bK, le.UE)],
                qe[Ke(-le.UK, -le.UW, -le.Uz, -le.UQ, le.u)],
              )
            ) {
              const rt = {
                  V: 389,
                  I: 359,
                  b: 342,
                  e: 721,
                },
                ct = {
                  V: 367,
                  I: 424,
                },
                Ft =
                  qe[ke(le.UM, 50, 38, le.Ui, -le.Ud)](
                    Ct,
                    Z,
                    qe[nt(-25, le.UO, le.UD, le.Ul, le.Ua)],
                  ) || globalThis[nt(727, le.UL, le.Ur, le.UF, le.UR)](),
                Ct = globalThis[
                  Ke(-le.Un, -le.T0, -le.T1, -270, "4AHc") +
                    Ke(-le.T2, -le.ex, -le.T3, -le.T4, le.T5) +
                    "ed"
                ](s, Ft, S[Ke(-le.T6, -le.T7, -le.T8, -540, le.T9)]);
              ((v[ke(le.TG, le.Tt, 466, le.ej, le.TV) + "rs"][
                globalThis[Ke(-676, -le.Cp, -le.TI, -le.Tb, le.Te) + "g"][
                  Ke(-667, -le.TC, -le.TU, -329, le.UD) + "me"
                ] || qe[$e(le.TT, 1994, le.Tk, le.TJ, le.ea)]
              ] = Ct),
                (A[ke(le.TZ, le.Ts, 355, le.bR, le.TS) + "rs"][
                  Fe(le.Tv, -265, 119, -202, -le.TA)
                ] = Ft),
                c[ke(-le.Tc, -le.Tj, -le.CX, "nELN", -le.Tm)](
                  globalThis[Fe(le.TH, le.TB, le.TP, -le.TY, -le.Tp) + "g"][
                    ke(le.Tu, le.Tq, le.Tw, "^INF", -le.Th)
                  ],
                )[Fe(le.Ty, -424, -le.Tx, -le.TX, -le.TN) + "ch"]((Sn) => {
                  const sn = {
                    V: 9,
                    I: 205,
                  };
                  function tn(st, nn, Qt, It, bt) {
                    return Fe(nn, nn - ct.V, Qt - ct.I, It - 230, st - 1233);
                  }
                  function _t(st, nn, Qt, It, bt) {
                    return Fe(nn, nn - rt.V, Qt - rt.I, It - rt.b, st - rt.e);
                  }
                  function Tt(st, nn, Qt, It, bt) {
                    return ke(st - sn.V, nn - 403, It - -sn.I, st, bt - 342);
                  }
                  Sn[_t(Je.V, "ZD^[", Je.I, Je.b, Je.e) + "rs"][Sn] =
                    globalThis[_t(Je.C, Je.U, Je.T, Je.k, Je.J) + "g"][
                      Tt(Je.Z, 462, -Je.s, Je.S, 14)
                    ][Sn];
                }));
            } else throw new Error(qe[nt(le.Tf, le.Tg, le.eA, le.To, le.TE)]);
          ((window[
            ke(le.X, le.e, 182, "R0Bl", -le.TK) +
              nt(603, le.TW, le.Tz, le.TQ, le.TM) +
              Fe(le.Ti, -le.Td, -le.TO, -727, -le.TD)
          ] = Ye),
            (window[
              ke(le.T4, le.Tl, le.Ta, le.eB, le.e1) +
                nt(le.TL, le.Tr, le.TF, le.TR, 367) +
                ke(le.Tn, le.TN, le.k0, "rCzN", 789) +
                "d"
            ] = de.id));
        } else
          return (
            globalThis[Ke(-le.k1, -le.k2, -le.k3, -le.Ta, le.C7) + "g"][
              Fe("wbNK", -35, -106, -le.k4, -64) + "t"
            ] &&
              Y[ke(420, le.k5, le.k6, le.k7, le.k8)](
                qe[ke(449, 32, le.k9, le.kG, le.CO)],
                qe[ke(le.kt, le.kV, 463, le.CB, le.T8)](
                  p,
                  u,
                  qe[$e(le.kI, 1206, le.kb, le.ke, "KKvt")],
                ),
                qe[Fe(le.kC, -le.kU, -le.kT, -le.kk, -le.d)](
                  q,
                  w,
                  qe[nt(501, le.kJ, le.kZ, le.Uh, le.Tb)],
                ),
                h,
              ),
            y &&
            qe[ke(le.UC, le.ks, 367, le.kS, le.kv)](
              qe[nt(le.kA, le.kc, "3Dfs", le.kj, le.km)](
                x,
                X,
                qe[ke(-le.kH, -le.kB, -le.kP, le.kY, 38)],
              ),
              qe[nt(le.kp, le.ku, le.kq, le.kw, le.kh)],
            )
              ? globalThis[
                  nt(le.ky, le.kx, "3Dfs", le.kX, 78) +
                    nt(le.kN, le.kf, le.kg, le.ko, le.GU) +
                    "d"
                ](
                  d[$e(le.kE, le.kK, le.kW, 1428, le.kz)] || "",
                  qe[Ke(-le.kQ, -262, -le.kM, -le.Ca, le.ki)](
                    O,
                    globalThis[Fe("h7U$", -462, -le.kd, le.kO, -le.kD) + "g"],
                    qe[Fe(le.B, -le.kl, -443, le.ka, -le.kL)],
                  ) ||
                    globalThis[
                      Fe(le.kr, -le.kF, -le.U, le.kR, -le.kn) +
                        nt(le.J0, le.J1, le.J2, 593, le.J0)
                    ],
                  D,
                  l,
                )
              : E &&
                  qe[Fe("jC%v", -le.J3, le.J4, -le.J5, -191)](
                    qe[$e(le.J6, 1361, le.J7, le.J8, "t3DS")](
                      K,
                      W,
                      qe[$e(le.J9, le.JG, le.Jt, 1789, le.Tv)],
                    ),
                    qe[nt(le.JV, 891, le.kC, le.JI, le.Jb)],
                  )
                ? globalThis[
                    Fe(le.Je, -le.eY, -le.JC, -le.JU, -le.q) +
                      ke(-le.JT, -252, le.Jk, "yxt&", le.JJ)
                  ](
                    a[ke(-le.JZ, -le.Js, le.JS, le.Jv, le.JA) + "s"] || "",
                    qe[Ke(-le.kk, -le.Jc, le.Jj, -15, le.Jm)](
                      L,
                      globalThis[Ke(-le.JH, -le.JB, -le.JP, -545, le.kr) + "g"],
                      qe[nt(le.C, le.TS, "yxt&", le.JY, 208)],
                    ) ||
                      globalThis[
                        nt(le.Jp, le.Ju, le.Jq, le.Jw, le.Jh) +
                          Ke(-367, -157, 161, le.eR, le.Jm)
                      ],
                    r,
                    F,
                  )
                : ""
          );
    } catch (Le) {
      if (
        qe[Ke(-245, -le.Cv, -le.Jy, le.Th, "4AHc")](
          qe[nt(le.Jx, le.JX, "t3DS")],
          qe[Ke(-le.Jg, -le.Jo, -le.JE, -215, "rCzN")],
        )
      )
        (console[nt(le.JK, le.JW, le.TH)](qe[nt(le.JM, le.Ji, le.A)], Le),
          ge && qe[Ke(-le.Jd, -le.JO, -le.JD, -603, le.Jl)](ge, Le),
          (window[
            Fe(le.bD, -le.Ja, -le.JL, -le.Jr, -le.JF) +
              Ke(-le.JR, -le.Jn, -le.Z0, 20, le.Tz) +
              Ke(-487, -le.kd, -le.Z1, -406, le.Jl)
          ] = -3560 + -4 * -1987 + -4388),
          (window[
            Fe(le.Z2, -le.Z3, -le.eJ, -le.Z4, -le.Z5) +
              Fe(le.er, -59, -le.Z6, -589, -329) +
              Ke(-le.Z7, -94, -93, -le.UA, le.er) +
              "d"
          ] = ""));
      else {
        qe[ke(le.Z8, le.Z9, le.kF, le.ZG)](e);
        const Ye = {};
        return ((Ye[Ke(-le.Zt, -le.ZV, -le.ZI, le.F, le.Zb) + "r"] = {}), Ye);
      }
    }
    function $e(Le, Ye, at, rt, ct) {
      return ne(Le - De.V, ct, at - De.I);
    }
    function Ke(Le, Ye, at, rt, ct) {
      return me(Le - Pe.V, Ye - -824, ct);
    }
    function Fe(Le, Ye, at, rt, ct) {
      return U(Le - 350, Ye - Ae.V, at - Ae.I, ct - -Ae.b, Le);
    }
    return 4326 + 2 * -1840 + -646;
  },
  Se = () => {
    const de = {
        V: 762,
        I: "#Z%#",
        b: 506,
        e: 218,
      },
      ge = {
        V: 280,
        I: 42,
        b: 445,
      };
    function le(Ae, Pe, De, Je, He) {
      return U(Ae - ge.V, Pe - ge.I, De - 227, De - -ge.b, Pe);
    }
    return new Date()["getTime"]();
  };
function _e(de, ge, le, Ae, Pe) {
  return ae(
    le -
      -{
        V: 841,
      }.V,
    de,
  );
}
function we(de, ge, le, Ae, Pe) {
  return ae(Pe - -817, de);
}
const xe = () => new ye();
function ae(de, ge) {
  de = de - 178;
  const le = ce();
  let Ae = le[de];
  if (ae.olLkuv === void 0) {
    var Pe = function (qe) {
      const nt =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
      let ke = "",
        $e = "";
      for (
        let Ke = 0, Fe, Le, Ye = 0;
        (Le = qe.charAt(Ye++));
        ~Le && ((Fe = Ke % 4 ? Fe * 64 + Le : Le), Ke++ % 4)
          ? (ke += String.fromCharCode(255 & (Fe >> ((-2 * Ke) & 6))))
          : 0
      )
        Le = nt.indexOf(Le);
      for (let Ke = 0, Fe = ke.length; Ke < Fe; Ke++)
        $e += "%" + ("00" + ke.charCodeAt(Ke).toString(16)).slice(-2);
      return decodeURIComponent($e);
    };
    const Ue = function (qe, nt) {
      let ke = [],
        $e = 0,
        Ke,
        Fe = "";
      qe = Pe(qe);
      let Le;
      for (Le = 0; Le < 256; Le++) ke[Le] = Le;
      for (Le = 0; Le < 256; Le++)
        (($e = ($e + ke[Le] + nt.charCodeAt(Le % nt.length)) % 256),
          (Ke = ke[Le]),
          (ke[Le] = ke[$e]),
          (ke[$e] = Ke));
      ((Le = 0), ($e = 0));
      for (let Ye = 0; Ye < qe.length; Ye++)
        ((Le = (Le + 1) % 256),
          ($e = ($e + ke[Le]) % 256),
          (Ke = ke[Le]),
          (ke[Le] = ke[$e]),
          (ke[$e] = Ke),
          (Fe += String.fromCharCode(
            qe.charCodeAt(Ye) ^ ke[(ke[Le] + ke[$e]) % 256],
          )));
      return Fe;
    };
    ((ae.dHKiiw = Ue), (ae.CyuGCs = {}), (ae.olLkuv = !![]));
  }
  const De = le[1800 + -6231 + 4431],
    Je = de + De,
    He = ae.CyuGCs[Je];
  return (
    He
      ? (Ae = He)
      : (ae.wQNXtL === void 0 && (ae.wQNXtL = !![]),
        (Ae = ae.dHKiiw(Ae, ge)),
        (ae.CyuGCs[Je] = Ae)),
    Ae
  );
}
function ce() {
  const de = [
    "W5dcGSk6DCoO",
    "W6lcQSo4Cd4",
    "WOLFW4GVzW",
    "WQddLtiieW",
    "oSk1WP5pW44",
    "f1pcReRcUq",
    "W7/cM3aJW4y",
    "ufpdVCkvca",
    "WRqNW6b1xa",
    "qCk9WOLqda",
    "p8oxiSo2WOC",
    "ECosWQhdJSot",
    "W6iYm07dQa",
    "x8ktrSk/zq",
    "W7uNjKi",
    "FmkfW4LprW",
    "5PYG5zYe5PAN6zs2lG",
    "WRJcShiuWRO",
    "d8kVWPHBW6W",
    "mSoqWPXHW6O",
    "cmkfW6WGWOi",
    "W401WOmiWPO",
    "WRz4W54CAq",
    "W6GDWQimW7u",
    "mmkKWP1dWRW",
    "tutdSmk0aW",
    "WOvnEmoS",
    "c8kJW68DWQO",
    "jmkfW5WCWQ8",
    "W4NcJNCrW4e",
    "W47dRSk5WOm",
    "gePaW4tcMq",
    "z14wWOH1",
    "WQHksmoaWPe",
    "WQFcPeRcUmoK",
    "WRxcPMmVWOS",
    "W63dT8kHWOhdQG",
    "sflcSSogWOC",
    "chvaW7NcSG",
    "Cmk2WPvX",
    "WQ/cSCosp8oe",
    "ifLNW6us",
    "W53cNZddMa",
    "cCoVhmovWQy",
    "umkyW55Dva",
    "W4ddP8o5W6Sc",
    "WQfZW5essa",
    "W7xdTCo4W5Wm",
    "WOFdQHu+pG",
    "W6xcMmk8yCok",
    "W6fnja",
    "WQ1nW7GzvW",
    "cCkdAmoQW6a",
    "df7cIG",
    "W7FcUq8J",
    "mmoeh8o5WQe",
    "emkUWPH7WPa",
    "W6RcHX4EWRi",
    "a1nGW4ZcVq",
    "ge/cNZRdVa",
    "omkeuCo8W6S",
    "pCowhCoJWPC",
    "qthcJY3cKa",
    "W4BcKXivWQy",
    "wq3cK8oaWRa",
    "zf1Pde4",
    "W5pdICk6vwu",
    "WR3dHJW8pG",
    "W4/dISk0DgW",
    "w1aNWQTY",
    "WOpcKYRdS8oF",
    "WPldVsKHgq",
    "W7LlgYFdVG",
    "BetcPSol",
    "WRtdVSoylCkq",
    "h8kzDSo/",
    "W4FcVmoIDIG",
    "WQ3cTCoUl8oa",
    "mXpdOmktW7RcJglcRKO7xSkoW6m",
    "jmoMcSozjCkeA8k3imkYWQasW4VcSG",
    "kCoVWPjdW7q",
    "W7dcNGK4WRO",
    "W6iVnu3dUq",
    "WRi2W7nOAG",
    "ucBcQcVcGW",
    "hCkyv8ovW4q",
    "WOOoW5HtBq",
    "WP3dGIOCnG",
    "AuT4n38",
    "fCkAWR11WQS",
    "y8kJxSkgyq",
    "WO9Rxmo3WPe",
    "kCo4lCogWQS",
    "W5pdRrBdJSkLW7fhBvrrW790jW",
    "Euy9",
    "kL/cO27cMG",
    "WRBcLmoM",
    "WOZcHSoyo8os",
    "WOrWx8oVWOa",
    "E8kYrSky",
    "ALSJWQ91",
    "qbdcHmom",
    "WQHFCSo2WOS",
    "mmoagCo8WPi",
    "W7JcS38JW58",
    "W4/cHtddKb0",
    "pCk4wCknyG",
    "fYC+W7RcPG",
    "pmojkSoeWQC",
    "eCkCWR9DWQ8",
    "WPKSW6j+xq",
    "W7q1iG7dVq",
    "bfbIW6tcTq",
    "W6WGWPy4WOq",
    "W6Dvnayv",
    "dKVcKepcVG",
    "imohcCoOWPS",
    "cvfIW44U",
    "5PA/6zsO5yk256EA6ywG",
    "W7KJm0FdVq",
    "WPCrW49zFW",
    "W4xcKmogoW8",
    "F0aWWQ9K",
    "WPtdMWD0W4q",
    "W53cSmoKF8ou",
    "zKWTWQfr",
    "BHVcNmkDWOm",
    "W7NcHMGdW58",
    "W6RdT8kDAve",
    "WQFdTr8OoW",
    "WOxcUbpdVmov",
    "dmkjymoJ",
    "W7n+gWqz",
    "WRhcUfFcKSoZ",
    "W6pdSwuSW5S",
    "dSkGWRP/WQS",
    "ASotWQxdICoD",
    "CSk9W6LFtq",
    "ACk5uCowW6W",
    "n8ojlW",
    "w8kzvmo5W5C",
    "W4lcM8oIFSoc",
    "p8oFiCoaWPu",
    "WP7dGJi2mG",
    "W5ZcHcBdMbO",
    "W4mHWO0JWQS",
    "cSkyB8o1W7S",
    "W6ldRSoeW6OR",
    "CW3cJCkcWOi",
    "W5ZdL8k6BKO",
    "dmk5W4SnWOC",
    "kSkZWPDhW4y",
    "jwZcLZtdQa",
    "ChBcOCor",
    "W77cS3OeW5W",
    "WRVdGdqAaa",
    "sSk9ASo2W4i",
    "h8kVWP9xWR4",
    "iCkfWO1PW7W",
    "yCkOWRjbW5m+vXS",
    "WRtcJ8oKkvy",
    "iM7cTdZdMq",
    "WOZcMH7dL8oC",
    "ASkeW4Xhqq",
    "beJcIG",
    "dCoglSoOWQK",
    "W7RcNSo4Bs4",
    "W77dJSkLWOVdVq",
    "WOjgDmo3WPe",
    "W4xdTCoWW6aR",
    "W7LBpr8V",
    "d8kdW40dWQe",
    "gflcMtNdRq",
    "qCk+WRnXeG",
    "W5bXhJGE",
    "W6NdPmobW6SQ",
    "WQVcU8oqoSov",
    "bCkjW5ejWRq",
    "qvlcU8okWOC",
    "cmkQWRDiW6a",
    "b0PFW44N",
    "WPhdRSo1W5lcNG",
    "vq05WP/dPmoeWRaQpmoBncdcUq",
    "Fe4IWQjm",
    "nSovlCoj",
    "C8kTWO5Weq",
    "f1vGW47cUW",
    "CKVdVmkrkq",
    "fv3cTW",
    "57kC57UN5PsY6zEsW7C",
    "xrhcPComWQ8",
    "qtdcVrlcMW",
    "qYJcQCk3WRC",
    "WRpcRmoEkSoF",
    "W6RcMHtdRJy",
    "DHVcT8kaWOu",
    "gCk+WOXkWOG",
    "WRGqW5HPCq",
    "WRdcJSoVa8o8",
    "WQhcTmoumCoJ",
    "W70Pnq",
    "W7VcPbm1WRa",
    "Cfe6WPji",
    "WROTW7n8wa",
    "kffyW7mk",
    "iKJcJCkaWQqolCoK",
    "v8k8WRvEnq",
    "cK/cMXRdQa",
    "emkVWOPNWRi",
    "jLtcIKlcQW",
    "WQqXW65OBW",
    "WRBdLtW",
    "h8kjA8o/W7S",
    "W4/cHmk+ESo9",
    "qIBcItlcKa",
    "WRBcQhq2W4i",
    "eCk5WPThWPi",
    "b2JcTtBdPq",
    "W759eW4z",
    "WRddS8oCW5FcMq",
    "g8o/WPrXW64",
    "W5xcUH4zWOi",
    "a8oZoCoaWQS",
    "h8oYfa",
    "qxxdV8kCpW",
    "kurY",
    "WRZcQLefWQW",
    "W7PliGa",
    "WQJcU8oiemor",
    "W7nRaKCm",
    "e8kRWOPs",
    "W6tdSSoqW7W2",
    "WQ/cICoT",
    "y8ktBCkEsa",
    "FKBcR8o6WOG",
    "e8ogd8o+WPy",
    "W47cGYtdHa",
    "WQddICodW7ZcMW",
    "v8kfsCo6W7m",
    "W7GPpa",
    "W5BdI8k4",
    "W5NdTmkLWOddSa",
    "yvBcOCocWQ8",
    "WP7dSmo1W6NcSq",
    "WPP9F8orWO8",
    "a8oUg8oCWRC",
    "d13cPulcQa",
    "BfNdV8kHna",
    "WRpdKbWbba",
    "yKpcSmogWQG",
    "ACojWR3dGCou",
    "WRFcJCofla",
    "WP1oW50wFG",
    "W47cGSk+ACoM",
    "W7b3aaCD",
    "W7dcUwG2",
    "Ch9SWQBcR8krbhzxqGfIW4pcOG",
    "EeP9dq",
    "b8kIWR1MWPK",
    "eLLO",
    "h8kMAmk0W68",
    "W4DwaaiW",
    "WO/cPmoggSo+",
    "mf9nW6av",
    "xmk4W4Pmtq",
    "WPVdVmoKW4dcUa",
    "W4JcSSoKFCoE",
    "qgLHjw8",
    "WOlcUvi",
    "xfhdGCkFia",
    "wSk0CCk9qa",
    "hmkcW5SlWQy",
    "iHW5",
    "W5ZcUSo4x8oh",
    "kHWoW5pdQG",
    "zfeWWQzX",
    "dmkFW48DWRK",
    "WRXkzmoOWOC",
    "l8kZWOTKW44",
    "C043",
    "W7pcRSoFxW0",
    "W791fYuA",
    "WPfzC8o/WPO",
    "ECk4uq",
    "cvfRW6xcSG",
    "BedcTmohWQC",
    "xKmEWOnJ",
    "e0HVW4FcPa",
    "W7q1iNZdJa",
    "WRJcNGBdU8oW",
    "WOHcW7nwW7ZcNN/dPmk4W5K1gLi",
    "W6JcN8kiq8o6",
    "WOdcNmozimoy",
    "BmkAW4TawG",
    "pCovlCooWPi",
    "WORcS0y",
    "W4RcHsZdMXu",
    "W67cRN0aW5G",
    "aCkKWRbDWRa",
    "WQ14W74YFG",
    "BrFcOmomWRi",
    "W7SGhvNdRa",
    "rK7dTCk1aG",
    "WQ/dKZWxaG",
    "fu5IW6/cUG",
    "sX/cQHVcTq",
    "W48YWQTmWQ8",
    "qxStWOTy",
    "cfLVW47cSq",
    "W4dcMrBdMa8",
    "W61rpGpdHq",
    "jYe3W7ldSG",
    "AmkRW5zpW7a5wIhcLa",
    "WPP4ASowWRy",
    "ACojWQBdHCoF",
    "nNhcGvBcTa",
    "WOjvW58AEG",
    "W4JcKmoCFqi",
    "a8kpBSo1W68",
    "kNLFW5RcUG",
    "AKC0WRzD",
    "tKWWWQr8",
    "Fv5hW4GgWP8y",
    "dSkjW5elWRi",
    "z0RcU8ofWQS",
    "WRhcRgu",
    "W7dcRgqTWP0",
    "bmk+WPDEWR4",
    "WRdcLeW9WO0",
    "uWFcHE++SW",
    "ffFcQG",
    "W5mrWQqgWQ0",
    "EahcV8oVWPG",
    "kg/cIMhcLa",
    "WQJcHmoXbSoO",
    "r8o0hCodWRy",
    "D8k0WOX9cG",
    "emobeCoJWOO",
    "WQ7dVGOfna",
    "u8kvsCoWW5m",
    "WQ/cSCow",
    "WRK6W7vJwa",
    "W7NcOSooEmo/",
    "nSockColWOm",
    "W4RcMmkCA8oG",
    "EmkYxSkpDa",
    "j8k6WO5gW4a",
    "dL3cLZNdQq",
    "dKJcJItdTq",
    "tYZcGIW",
    "cfNcTcpdMW",
    "WQNcOCoKdf8",
    "CmooWQddHSo/",
    "W74vWOyjWRa",
    "WR7cMX/dKCom",
    "WRpcMmoTdCo0",
    "vZNcLZBcHq",
    "WPlcMX/dKSoD",
    "bfFcOepcQq",
    "c8o0hCoJWQS",
    "WRJcU3y5WO8",
    "W6jlbHG",
    "iv7cK2ZcJG",
    "xN8YWOrn",
    "AeRcSG",
    "vCkeq8oY",
    "gmkpDmoUW4i",
    "ACouWQJdHSoB",
    "W4tcQSorAIi",
    "ACk+WPj9cW",
    "FK0GWQLf",
    "BNNdV8kBfW",
    "W63cNZGRWQa",
    "A8kFuSoaW5C",
    "nSk4WQr2WQi",
    "WPldPCoKW5tcTG",
    "v1lcV8kOsW",
    "vSo5WP3dNmoO",
    "WPbrB8oSWQG",
    "w8kfq8oG",
    "W4BcR8k3W5xdPq",
    "BmoBECotW5m",
    "ymkaWO9ofG",
    "eCkyuCovW6m",
    "BuRcUW",
    "W6VcVwmKW5S",
    "k8o/WOjhW7q",
    "c8k2W4yOWQK",
    "iKlcL0pcOq",
    "W7iPpexdSq",
    "WRFdVrnzW5e",
    "nfNcKLBcGW",
    "WQxdJJq8AG",
    "fNZdG2NdGq7dJ8o7W5XAW5JdSq",
    "urhcGCkeWQ4",
    "DX4TWRXqW48LxmkvzMCT",
    "W7tdQmkMWRldKa",
    "wa3cLG",
    "p8o4WOndW6W",
    "omk5WQ1GW4S",
    "jCkZWP4",
    "W4ZcL8oKDmom",
    "ldW8W7i",
    "WQRdRZfpW7C",
    "thtdLCkzia",
    "ySkYwq",
    "gmojWOrfW7C",
    "A3zkh0K",
    "W4NcOCoJD8od",
    "sIRcLdVcLa",
    "owP+W7RcKG",
    "W6tcUbVdLsu",
    "W4dcHcu",
    "W5GDWOGQWQC",
    "nYe3",
    "W4/dLSkZ",
    "WPKYW6jBBa",
    "WQ82W6H8xa",
    "nmkyWPnwWRG",
    "omoulCoBWQ8",
    "tx4BWQ5q",
    "W6b2paqx",
    "f1FcT1lVV5C",
    "uCkxuSoYW5K",
    "BMjXlKi",
    "W4BcMmkTnSo7",
    "lmkUWOToW50",
    "W6hcIruHWRW",
    "WOldKIe3",
    "rfxdTmkDaG",
    "WO7cUudcN8oW",
    "uG3cG8oeWR0",
    "WQHUW608tW",
    "d2PFW67cKa",
    "cSkdW5eiWQK",
    "FSkWBSk4zq",
    "FXJdTmktWPq",
    "fmk+W551WRq",
    "hCkjWP1cW78",
    "g8knW5SpWRi",
    "W5xcS3KxW7q",
    "W5lcSmoRFSod",
    "ECk5xmkhza",
    "mmkKWRjcWPu",
    "c1FcP0FcUq",
    "e8o1eCohWR8",
    "chjhW6mp",
    "WQtcNbVdK8kz",
    "WRVdI8o+jfq",
    "W7BcP8kttmoz",
    "W47cHmk/CSoL",
    "W5NdLCkhWPFdNW",
    "W4NcOCoRD8ow",
    "WRpdSSodW5pcPG",
    "WQlcHXddUmox",
    "W6VcJXO1WRe",
    "CmkRWRnGda",
    "W6NcMSoFuSor",
    "cSoae8kKWO5ii8ocWRKTW7pdImoT",
    "W4lcKSoxva0",
    "hSo1cSov",
    "k0H6W64f",
    "W7nRaJuO",
    "lYSGW5RdUG",
    "pCoel8oaWPa",
    "WOm2W7HHxa",
    "BSoCWQldMa",
    "W5xcMbOlWPa",
    "WPnrBSoS",
    "zCkWWOL7ea",
    "p8oTWOns",
    "B0LDjfO",
    "WQFcHmoUn8o5",
    "BubHb1G",
    "W6uapa3dQa",
    "WOLFW4JVVAe",
    "dmoce8kLWO5liSoMWOSTW7tdLSoG",
    "Fhi3WO56",
    "WOldKCknwgxdVCoG",
    "W47dJCkYF3a",
    "DSk4tCkgCa",
    "WO/cNSo9gSoc",
    "rmk0u8oJW5u",
    "WPpdMqz8W5W",
    "WPJcSqxdQCon",
    "aCknW4Wg",
    "jCkyWPHNWQW",
    "WRJcShi4WPC",
    "W7pcUxaHW5m",
    "hSkLWPa",
    "i05RW4VcOa",
    "a8ksy8o8",
    "nKjYW6qb",
    "W5NdSCklv0y",
    "C0VdO8kNia",
    "F046WOHi",
    "WQ3dMYfw",
    "WQVcK2pcSSoz",
    "W6xcMr4L",
    "W5dcOrybWRC",
    "iIeRW7NdUG",
    "ESkzW5CexG",
    "WPFcMmo9pmoe",
    "BCk1xmo9W5i",
    "W7OmWQ4HWRK",
    "l8kVWPXv",
    "W6TmiGRdNG",
    "bu9+W7xcGa",
    "W4pcMSotFW4",
    "xH/cVSkEWQu",
    "cmoehmoTWOq",
    "g1tcJsm",
    "W7lcUdWiWOy",
    "WRBcGSoSdq",
    "W4lcKCoxFW",
    "pxNcOelcQa",
    "W4dcHmkZFCoG",
    "W7jkkXi0",
    "c1FcOW",
    "lSkxAmoZW40",
    "WQTuW58uAG",
    "vSkHW7vBBa",
    "WOPrC8k2WOO",
    "W6tcQmo8xdi",
    "WR7cRgWTWOC",
    "WPbkFmo1WPi",
    "W4BcMCkVDmo7",
    "WO3dNZnAW5S",
    "57oE57U+5PwN6zsKxa",
    "EeqGWQDD",
    "W5/cUCoCnrS",
    "kmkKWPboW5W",
    "o8ouomoWWRi",
    "bSkfCSoYW6C",
    "hmktqmo5W6C",
    "WPlcMK/dLCoY",
    "iuPHW6S",
    "dmkuW4SCWQe",
    "xSkhC8oyW4C",
    "WOHWz8oFWO4",
    "vKOjWOjU",
    "WOznBCk1WOC",
    "imoJnSoMWPm",
    "F8kHuSowW4i",
    "reJdGSkEja",
    "W5ZdN8oBAeS",
    "W5PIbs4Y",
    "W4RcHCk+D8o8",
    "WRhcG8o5",
    "WQ7cRha/",
    "ceNcMZBdUa",
    "jmkYWQT5WPa",
    "W5zcl8oKW5m",
    "rCkptCoSW7m",
    "WO7dLmokW6JcVW",
    "E8oVW4GzWPBcIvbEW618ka",
    "fCoFW4nAWRW",
    "WQxcLSomfu0",
    "ExrLife",
    "pCoNWQnmW6K",
    "yCk3WPr1eW",
    "W6ddRSogW7Kh",
    "W5OmWQWnWRS",
    "WQRcICoK",
    "qIBcIrRcKa",
    "hSkNWPT8WR0",
    "z8k+uCkpFG",
    "W50BWRCpWQK",
    "WQFcU8osmCoc",
    "WQ7dQtTtW5G",
    "W6ZcMCotwmoY",
    "5PAO6zwt5ych56wu6ysP",
    "WPf4zCowWOy",
    "cfxdTmkJeG",
    "W7FcS3y",
    "ssZcJZFcNG",
    "fbxcPmoHxNRcOSoldSoSeH9D",
    "ALD6luO",
    "W4VdTSkyq1e",
    "aCoNkCosWPS",
    "EuPK",
    "WRGNW7i",
    "WPNdSSoKWOBcSW",
    "tCkxvmo1W5S",
    "WRNcPNe",
    "WOxcS0/cNCo8",
    "rYBcLtNcMa",
    "gSkyW5ydWQu",
    "W6DMmt/dOG",
    "t0y0WQnG",
    "kKv4W40Q",
    "bmkfW5WCWQ8",
    "A2FdP8kJmq",
    "W4RcTmo4E8ol",
    "e1NcQvy",
    "jSkRWQT5WQe",
    "W5qOmuZdVa",
    "qSkHWQnTka",
    "y0VcTmoxWRC",
    "k8oTW4HEWQS",
    "a2RcNv7cHq",
    "FW3cQCk4WQu",
    "hcmxW7xdQW",
    "W54hWRurWRe",
    "W73cR3mnW6m",
    "W4FcKMm7iCkNWQnoaa",
    "A8k5W5nB",
    "WR/cHXNdMW",
    "CW3cMmkxWPG",
    "WRNcGKWNWOG",
    "WRSNW690sW",
    "x8ohWPZdJCow",
    "aLBcMXJdQG",
    "xSkzsmoYW58",
    "WQJdQIDXWOiCm8oFW6m3t1fb",
    "BCklW4nixa",
    "WOBdJrzCW6C",
    "AmoyWR/dHmoB",
    "WPldRSoGW7NcGW",
    "WQ/cTg44WOW",
    "WRFcLwGYWQO",
    "W4ZcJg/dIrK",
    "vmkyq8oW",
    "iSk5WObs",
    "W4xcRSkHWP7dRSoKW6fYW5jCWRi",
    "s8krWQf1ka",
    "W4RcIY7dKq",
    "WO5/BCo/WRi",
    "W5ldVSkQWOldVa",
    "tcZcMJVcLa",
    "5P+k5z+S5PEx6zspWQ8",
    "kuRcS8ofWRe",
    "ymkLWPr1",
    "bmkLWOXhWPe",
    "uCkBCCkyDG",
    "nty/W4FdNW",
    "W5CBWQydWRW",
    "lmkKWO1tW44",
    "AbpcNCkgWOu",
    "bv98W43cNG",
  ];
  return (
    (ce = function () {
      return de;
    }),
    ce()
  );
}

const Bt = new ye();

res = Bt.generateSignature(Lt, {
  platform: "pc",
  getId: function () {
    // return (
    //   _e.Z.userEspAccount.accountUcId ||
    //   window.esp_AccountId ||
    //   Jt.get("__accountId__")
    // );
    return 57903154;
  },
  entrySrc: 204, // (0, Ye.te)(ut.xI.ENTRANCE_ESP_PC)
  signatureKey: "esp-sature",
});

console.log("res: ", res);
