# --*-- coding: utf-8 --*--

import execjs
import requests
import re


def encrypt_yrx5():
    all_data = []
    for page_num in range(1, 6):
        with open("./index.js", "r", encoding="utf-8") as f:
            encrypt = f.read()
            encrypt_params = execjs.compile(encrypt).call("getParamers")
        headers = {
            "user-agent": "yuanrenxue",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            # 'Accept-Encoding': 'gzip, deflate, br, zstd',
            "sec-ch-ua-platform": '"macOS"',
            "x-requested-with": "XMLHttpRequest",
            "sec-ch-ua": '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://match.yuanrenxue.cn/match/5",
            "accept-language": "zh-CN,zh;q=0.9",
            "priority": "u=1, i",
        }
        cookies = {
            "HMACCOUNT": "748DAB9CB8DCC13A",
            "sessionid": "zpn1r2x4v5dt7tas0g9iagnpw6x87m9r",
            "Hm_lvt_f80b2b389f44bbfb3bfe1704817d44e0": "1774786211",
            "Hm_lpvt_f80b2b389f44bbfb3bfe1704817d44e0": "1777125888",
            "m": str(encrypt_params["cookie_m"]),
            "RM4hZBv0dDon443M": encrypt_params["cookie_rm4"],
        }
        params = {"m": encrypt_params["m"], "f": encrypt_params["f"], "page": page_num}
        url = "https://match.yuanrenxue.cn/api/question/5"
        response = requests.get(
            url, headers=headers, cookies=cookies, params=params,
        )
        print(response.json())
        data = response.json()["data"]
        all_data.extend(data)
    
    print("anser:", sum(all_data))


if __name__ == "__main__":
    encrypt_yrx5()
