# --*-- coding: utf-8 --*--

import execjs
import requests
import re


def encrypt_yrx5():
    all_data = []
    for page_num in range(1, 6):
        with open("./dev.js", "r", encoding="utf-8") as f:
            encrypt = f.read()
            encrypt_params = execjs.compile(encrypt).call("decrypt", page_num)

            print(f"encrypt_params :: {encrypt_params}")

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
            "referer": "https://match.yuanrenxue.cn/match/18",
            "accept-language": "zh-CN,zh;q=0.9",
            "priority": "u=1, i",
        }
        cookies = {
            "sessionid": "8vv0lia3r430682zvgsikdg8t0gv430l",
        }
        params = {"page": page_num,"t": encrypt_params["t"], "v": encrypt_params["v"], }
        url = "https://match.yuanrenxue.cn/api/v/question/18data"
        response = requests.get(
            url, headers=headers, cookies=cookies, params=params, 
        )
        print(response.json())
        data = response.json()["data"]
        all_data.extend(data)
    
    print("anser:", sum(all_data))


if __name__ == "__main__":
    encrypt_yrx5()
