const {xhs_crc32, xhs_b64Encode, xhs_encodeUtf8} = require('./tool.js')

// function get_fp() {
//     return new Promise((resolve) => {
//         window.xhsFingerprintV3.getCurMiniUa((e) => {
//             resolve(e);
//         });
//     });
// }

function get_xs_common(a1) {
    const data = {
        "s0": 3, // 设备码
        "s1": "",
        "x0": "1",
        "x1": "4.3.5",
        "x2": "Mac OS",
        "x3": "xhs-pc-web",
        "x4": "6.19.1",
        "x5": "19c8d6f6418rwq9vl3u65m2n2e37bns3bai1avlwi30000223458",
        "x6": "",
        "x7": "",
        // fp window.xhsFingerprintV3.getCurMiniUa(e=>return e)
        "x8": "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSBMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx+PGDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDtIC6eDVw2IENsSqtlnlSuNjVtIvoekqt3cZ7sVo4gIESyIhE4NnquIxhnqz8gIkIfoqwkICrWGd3sdlOeVPw3IvAe0fgedDhwIEOs1W+FyqtXIh3e1dAe3FOsVPwOefOsYqt3IxTsgU6sSuw5L7KsfVwgI3RzI3kVoVw+aqwKoUIayMosde7sVqw+IkKeD0AsVLRBIv5ex0dedI+BICgsfPwHIvIFQPwHPVtAIx5e6utvIkoe6utsI3de1VwsnVtlyqtsIkSLICHr27lk2Iee1utCIESwIE6sjqtnzIzrcnNsYjYuIihLGutzrutlIv5ekqtUOpKs1rNexZusIhveYzAs1qwLButwIxoeWVt7IkgexjRwIveeSd/efVtSIxvs1Pw64B8qIkWyIvJsxFOekgveDS6edVtBIkF1I3Q6rVtQIvchIE5s3FqAwaKeYuw6IxLFguwt+SJeVjesVPtezVttIkVCICSE+ut4sVwmIk0sxb0skqw7LqwgIhMZrutRIxZPw/qbI3OsdoJsf75edqwHtqtnIiVqIxdskVtzIC7ejbYAIhQnelkDIv+OIhJejPw7qutWPutdIxZZIEAs6j7e1VwTznZnICGdpPteZVtyIkFYI3RBIkSaIE/exD/s1fk5PPwbIvIe2PwmNPw2Ihde3dF/Iihv/BveiPt3ZqtaocHmZ9qiIxbX/Pw4Ii0sD0YQI3QDmuwFIikWOutvbutsIEuiIh4RICScsPwUIiIzIE/s3Vw/OYReIvIJIvesTnoskPwRICYWICLMaWDuIvl1GYr9IvvsfS0e6Pw9IhOsfPtSIhIHIE0s0uwzIvlcbqwhIEgsicuynqtAOqt6IC6edqteIEdsWo4/IhvsxdAsVqtar//sdPwNeMds0PtaIxNs6UAe3PtaIEqCIiQvQqwsm0+tI3KekPwQeageimb6BVthIxm2IiesxZRpI3NejutoIhV9IhAex9Y5Ihh5IiVeJSboIvgeTZW6Ih4dIxuGIvJsfjYGwPtRKutL+eKeWbosdVtJIvKedSveVPwotqt2Ix83euwMeqwqJqw6NVtf2ut6QjNeTMvsk0As3l6e6PwqIiPpIhY6I3YEI35ekoAe6j+3+VwcIELqrutnPgOsVVw2Iv3eYLNsSfW4I3gsjuwzyWI9ICAedPtjIvOs3VtWHutyIvOeYscGqPwbzseeDpWDIideSPtZBVtYce0e6Pt9sVt2ZPwsIC8qIEkABLesYFdsTqtVI3gsVutHouwqG/6s1DbRoB4v2WmfZVtNeutaIvFTI3LGI3ZM2Y5e6AHQIvPNI3itrPwPI3pTJVw+IkgeTZVxoutjIhuKautKICve3YRsIEuiI3NejPt2bPwsbzgeSj7sfVtc+ut2I3RDyuwZIhdsSB/eYe7e1qwLICHnIENeVe8sIx7e0uwQIvhAICgsjqtwPD4ZbutxgqtJI3PCeVtLIvesSc7ejqwZIh7eVgr8I3/eDM6ejqwsIirrI3l8/Udsfzvs0qwZIiesWsNe6PwDeqw/cVtrIh+zIvOe0uwfIk+cI3PV8utDKabbQpOe3oVLIvEH4Pt98qwIIEOe0pE0IvZ=",
        "x9": -1736536910,
        "x10": 0,
        "x11": "normal",
        "x12": "1781575002898;1780545471372" //  localStorage.getItem("dsllt") + ";" + window._dsl,
    }

    const xs_common = xhs_b64Encode(xhs_encodeUtf8(JSON.stringify(data)))
    console.log(xs_common.length)

}