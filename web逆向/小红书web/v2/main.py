import requests

cookies = {
    "abRequestId": "0a339826-dd70-5278-8b9d-d980dc211d65",
    "webBuild": "5.1.1",
    "xsecappid": "xhs-pc-web",
    "a1": "19bac1badc7p0kxg5v912g72jrjt0r7wr5dt8rjxi30000240053",
}

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json; application/json;charset=UTF-8",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "origin": "https://www.xiaohongshu.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.xiaohongshu.com/",
    "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    # "x-b3-traceid": "4ef6792b302358a6",
    "x-s": "XYS_2UQhPsHCH0c1Pjh9HjIj2erjwjQhyoPTqBPT49pjHjIj2eHjwjQ+GnPW/MPjNsQhPUHCHfM1qAZUPebKPsRo/sRNp78+4b+940pF2ebb+nQiaezr8M4GN9+I/gbaLL+i8dYgyf87nnRiGf+AJ0bs4b4bwozypDMcPLY7PopbtMmV8p+FcdkOnDG9/rl3JdbEwB+rz/8kJg4lqnENPSGUpSS1cLSB47Y6pFRT8SQUGFzNG7+9/LRcJURPyBbrnok/aLlo4pb9+7QOP7HU2rpAarEMw/q9LURy4n+mJ/YtPp4ow/FRHjIj2ecjwjQ6GfkSG7cjKc==",  # "x-xray-traceid": "cda240a6f212ab254b9837a45c509725",
    # 'Cookie': 'abRequestId=0a339826-dd70-5278-8b9d-d980dc211d65; webBuild=5.1.1; xsecappid=xhs-pc-web; a1=19babfb1d5be8le766pb4hq7uijbipkmpyp5afuwv30000327653',
}

json_data = {}

response = requests.post(
    "https://edith.xiaohongshu.com/api/sns/web/v1/login/activate",
    cookies=cookies,
    headers=headers,
    json=json_data,
)

print(response.json())
