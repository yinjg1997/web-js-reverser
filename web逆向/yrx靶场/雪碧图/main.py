"""
雪碧图是将多个小图片合并成一张大图，通过 CSS 偏移来显示不同的局部图片，常用于字体反爬。

雪碧图按顺序偏移的规律: 按其出现顺序（从 1 开始），将 style 中的偏移量设为 (序号 * 单张图宽度 + css 偏移量)。

"""

import requests
import re
import json
import base64
import hashlib
from parsel import Selector
import ddddocr

ocr = ddddocr.DdddOcr(show_ad=False)


headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://match.yuanrenxue.cn/match/4",
    "sec-ch-ua": '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "HMACCOUNT=748DAB9CB8DCC13A; sessionid=ur301zsoian2f5u4uq3bu65ejuywao8n; Hm_lvt_f80b2b389f44bbfb3bfe1704817d44e0=1774786211; Hm_lpvt_f80b2b389f44bbfb3bfe1704817d44e0=1776935213",
}

response = requests.get(
    "https://match.yuanrenxue.cn/api/question/4?page=1&pageSize=10&kw", headers=headers
)
data = response.json()

key = data["key"]
value = data["value"]
print(f"key:: {key}")
print(f"value:: {value}")
encoded = (
    base64.b64encode((key + value).encode("utf-8")).decode("utf-8").replace("=", "")
)
j_key = hashlib.md5(encoded.encode("utf-8")).hexdigest()
print(f"base64:: {encoded}")
print(f"j_key:: {j_key}\n")

info = data["info"]
sel = Selector(text=info)


value_list = []
for td in sel.css("td"):
    # print(td)
    img_data = []
    for index, img in enumerate(td.css(f'img.img_number:not([class~="{j_key}"])'), 1):
        style = img.css("::attr(style)").get()

        style_match = re.search(r"left:([-\d.]+)px", style)

        img_data.append(
            {
                "left": float(style_match.group(1)) + index * 8.5,
                "img_base64": img.css("::attr(src)").get(),
                "html": re.sub(r"left:[-\d.]+px", "left:0px", img.get()),
            }
        )

    img_data.sort(key=lambda x: x["left"])

    value_str = ""
    for item in img_data:
        img_base64 = item["img_base64"]
        img_bytes = base64.b64decode(img_base64.split("base64,")[1])
        digit = ocr.classification(img_bytes)
        value_str += digit

    value_list.append(int(value_str))
print(value_list)

