# --*-- coding: utf-8 --*--

import httpx


def encrypt_yrx():
    all_data = []
    headers = {
        "user-agent": "yuanrenxue",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "sec-ch-ua-platform": '"macOS"',
        "x-requested-with": "XMLHttpRequest",
        "sec-ch-ua": '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://match.yuanrenxue.cn/match/17",
        "accept-language": "zh-CN,zh;q=0.9",
        "priority": "u=1, i",
    }
    cookies = {
        "sessionid": "a2kvkqy4jxy4v8k4a7542f0bxcyobl9l",
    }

    with httpx.Client(http2=True, verify=False) as client:
        for page_num in range(1, 6):
            params = {
                'page': page_num,
                'pageSize': '10',
                'kw': '',
            }
            url = "https://match.yuanrenxue.cn/api/question/17"
            response = client.get(
                url, headers=headers, cookies=cookies, params=params,
            )
            print(f"HTTP/{response.http_version}", response.json())
            data = response.json()["data"]
            all_data.extend(data)

    print("answer:", sum(all_data))


if __name__ == "__main__":
    encrypt_yrx()
