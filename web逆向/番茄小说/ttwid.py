import requests

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://fanqienovel.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://fanqienovel.com/',
    'sec-ch-ua': '"Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-storage-access': 'active',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
}

data = '{"aid":2503,"service":"fanqienovel.com","unionHost":"https://ttwid.bytedance.com","union":true,"needFid":true,"fid":""}'

response = requests.post('https://ttwid.bytedance.com/ttwid/union/register/', headers=headers, data=data)
print(response.json())