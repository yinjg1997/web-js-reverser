"""
浏览器 DevTools 会重排 header 的展示顺序并不等于实际发送的顺序,
真实顺序要看抓包软件中请求/响应头, 或看抓包软件中的原始请求/响应头


通过 request 的属性设置 header 会改变 header 顺序
# 会改变顺序
sess.get('https://match.yuanrenxue.cn/api2/3', verify=False, headers=headers2)
# 不会改变顺序
sess.headers = headers2
"""
import requests

sess = requests.session()

# headers2 = {
#     'accept': '*/*',
#     'referer': 'https://match.yuanrenxue.cn/match/3',
#     "accept-encoding": "gzip, deflate, br, zstd",
#     'accept-language': 'zh-CN,zh;q=0.9',
#     'cookie': 'HMACCOUNT=748DAB9CB8DCC13A; sessionid=ur301zsoian2f5u4uq3bu65ejuywao8n; Hm_lvt_f80b2b389f44bbfb3bfe1704817d44e0=1774786211; Hm_lpvt_f80b2b389f44bbfb3bfe1704817d44e0=1776862165',
# }
#
# sess.headers = headers2
#
# response = sess.get('https://match.yuanrenxue.cn/api2/3', verify=False)
# print(response.headers.get('Set-Cookie'))

data_list = []
for page in range(1, 6):
    headers2 = {
        'accept': '*/*',
        'referer': 'https://match.yuanrenxue.cn/match/3',
        "accept-encoding": "gzip, deflate, br, zstd",
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': 'HMACCOUNT=748DAB9CB8DCC13A; sessionid=ur301zsoian2f5u4uq3bu65ejuywao8n; Hm_lvt_f80b2b389f44bbfb3bfe1704817d44e0=1774786211; Hm_lpvt_f80b2b389f44bbfb3bfe1704817d44e0=1776862165',
    }
    if page == 5:
        headers2["user-agent"] = "yuanrenxue"

    sess.headers = headers2

    sess.get('https://match.yuanrenxue.cn/api2/3')
    params = {
        'page': page,
        'pageSize': '10',
        'kw': '',
    }

    response = sess.get('https://match.yuanrenxue.cn/api/question/3', params=params)
    print(response.json())
    data_list.extend(response.json()["data"])

print(f"answer:: {sum(data_list)}")
