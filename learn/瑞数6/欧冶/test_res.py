import subprocess
from functools import partial  # 这玩意能锁定一个函数的参数

# 锁定subprocess.Popen的encoding参数为"utf-8"
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import requests
import execjs
from lxml import etree
import json


class OuZhi:
    def __init__(self):
        self.url = 'https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50'
        self.headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://www.ouyeel.com",
            "Pragma": "no-cache",
            "Referer": "https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }

        self.requests = requests.session()

    def get_cookie(self):
        code = self.requests.get(url=self.url, headers=self.headers)
        html = etree.HTML(code.text)
        content = html.xpath("//meta[2]/@content")[0]
        ts = html.xpath("//script[1]/text()")[0]
        fun_code_url = "https://www.ouyeel.com" + html.xpath("//script[2]/@src")[0]

        func_code = self.get_auto_func_js(fun_code_url)
        # 1. 先读取原文件内容（用 "r" 读取模式）
        with open("all_in_one_template.js", "r", encoding="utf-8") as f:
            all_in_one = f.read()

        # 2. 执行替换（接收 replace 的返回值）
        all_in_one = all_in_one.replace("content_placeholder", content).replace("'ts_data'", ts).replace(
            "'auto_js_data'", func_code)

        # 3. 覆盖写入文件（用 "w" 写入模式）
        with open("all_in_one.js", "w", encoding="utf-8") as f:
            f.write(all_in_one)

        cookie = execjs.compile(all_in_one).call('get_cookie')
        # print(cookie)
        return {
            # 'T0k1m0u5AfREO':code.cookies.get('T0k1m0u5AfREO'),
            cookie.split("=")[0]: cookie.split("=")[1]
        }
    def get_auto_func_js(self, url):
        res = self.requests.get(url)
        return res.text


    def test_req(self, cookie):
        res = self.requests.get(url=self.url,headers=self.headers,cookies=cookie)
        print("响应状态码:::::", res.status_code)
        print("res:::::", res.text)

        # # for i in range(10):
        # data = {
        #     'criteriaJson': '{"pageIndex":' + str(
        #         i) + ',"pageSize":50,"industryComponent":null,"channel":null,"productType":null,"sort":null,"warehouseCode":null,"key_search":null,"is_central":null,"searchField":null,"companyCode":null,"inquiryCategory":null,"inquirySpec":null,"provider":null,"shopCode":null,"steelFactory":null,"resourceIds":null,"jsonParam":{},"excludeShowSoldOut":null}',
        # }
        #
        # response = self.requests.post(
        #     'https://www.ouyeel.com/search-ng/commoditySearch/queryCommodityResult',
        #     cookies=cookie,
        #     headers=self.headers,
        #     data=data,
        # )
        # print(response)
        # print(response.text)
        # for item in json.loads(response.json()["resultList"]):
        #     lists = dict()
        #     lists["company"] = item['providerName']
        #     lists["title"] = item['manufactureName']
        #     lists["textureType"] = item['productName']
        #     if item.get('resourceObj', -1) != -1:
        #         lists["price"] = "￥" + str(item.get('resourceObj').get('publishPrice')) + "/吨"
        #     else:
        #         lists["price"] = "￥" + str(item.get('publishPrice')) + "/吨"
        #
        #     if item.get('resourceObj', -1) != -1:
        #         if item.get('resourceObj').get('weight', -1) != -1:
        #             lists["weight"] = str(item.get('resourceObj').get('weight')) + "吨/件"
        #     else:
        #         if item.get('weight', -1) != -1:
        #             lists["weight"] = str(item.get('weight')) + "吨/件"
        #         else:
        #             lists["weight"] = str(item.get('totalWeight')) + "吨/件"
        #
        #     print(lists)

    def main(self):
        cookie = self.get_cookie()
        self.test_req(cookie)


if __name__ == '__main__':
    ouzhi = OuZhi()
    ouzhi.main()
