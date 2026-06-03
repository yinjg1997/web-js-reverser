import requests

cookies = {
    'cookie2': '11adafd8a03bf6f3f6263347dd74b915',
    'mtop_partitioned_detect': '1',
    '_m_h5_tk': '3de4a4adc0651df37ddd726ca1a82af9_1779769453289',
    '_m_h5_tk_enc': '69a98e177b31543ad0b8676cfa131c7b',
    'cna': 'puWbIp6I0QQCAXPENxYGfN8F',
    '_samesite_flag_': 'true',
    't': '01d730ac1d5d9d63eb051f0658e51d0f',
    '_tb_token_': '3a395ebe3368e',
    'xlly_s': '1',
    'tracknick': '%E4%BA%BA%E5%82%BB%E9%92%B1%E5%A4%9A%E6%89%8B%E6%8A%96',
    'unb': '2921507843',
    'sgcookie': 'E100qaqEYvR6v3p4ghtSlpepNLxwowlHniIv0eu%2B6tC5opBtdzpqT%2B14FtYuqD4%2F3F%2BqJp7JM3rAxU9lljOmPUizdjIeI89ISbsn5cZ8AadQ0BM%3D',
    'csg': '12c66c18',
    'havana_lgc2_77': 'eyJoaWQiOjI5MjE1MDc4NDMsInNnIjoiMzg2ZTJjY2FkNDY5ODcwNzc1MTk5Nzg3MjBmMmMzMzUiLCJzaXRlIjo3NywidG9rZW4iOiIxNy1pS2JzMHpuTWdJMFhqTC1RMndDUSJ9',
    '_hvn_lgc_': '77',
    'havana_lgc_exp': '1782351034419',
    'sdkSilent': '1779845436665',
    'tfstk': 'gILn3e4ubOwbcrwZo87IjLv9hWiOJw_5XLUReaBrbOW_pJUpa8vkQKdLJUdPELvOCyKKAgBuZwT9vzBKdaAyHaDxHq3vOB_hzxHxAY4lfw1u8yzze15NMafUC3KnwB_5zAFTzm3DOpj4H3WFzfbNZ6VFzTSF_ffliT7PLgyabsWNUaJPUNRNa6VFUMWU7ff5Q67zYalG7O1lzTJPzfAZ9fUPnU867xOUPbRyjrYCtMX2T9Rp1FrC7kOfITXy-6AiWBBG61LGtMXV26fj4EA2TE1kPjrlEItep19ooAbw-pYFja0u5wdDbpjMxY4GfhRXzGxsnoOXTpxV0eui1GYBMwWMPba5LHdyygYE37BeRpLGcUwnBTKv6eSM3AUMFgxe0w8onVSrDlrVFCa5_bLaVusF11XACZXNda6rnBlisoiCY11KHUhgby2bzzhKsfqbsM519xC..',
}

headers = {
    'accept': 'application/json',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://www.goofish.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.goofish.com/',
    'sec-ch-ua': '"Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
    # 'cookie': 'cookie2=11adafd8a03bf6f3f6263347dd74b915; mtop_partitioned_detect=1; _m_h5_tk=3de4a4adc0651df37ddd726ca1a82af9_1779769453289; _m_h5_tk_enc=69a98e177b31543ad0b8676cfa131c7b; cna=puWbIp6I0QQCAXPENxYGfN8F; _samesite_flag_=true; t=01d730ac1d5d9d63eb051f0658e51d0f; _tb_token_=3a395ebe3368e; xlly_s=1; tracknick=%E4%BA%BA%E5%82%BB%E9%92%B1%E5%A4%9A%E6%89%8B%E6%8A%96; unb=2921507843; sgcookie=E100qaqEYvR6v3p4ghtSlpepNLxwowlHniIv0eu%2B6tC5opBtdzpqT%2B14FtYuqD4%2F3F%2BqJp7JM3rAxU9lljOmPUizdjIeI89ISbsn5cZ8AadQ0BM%3D; csg=12c66c18; havana_lgc2_77=eyJoaWQiOjI5MjE1MDc4NDMsInNnIjoiMzg2ZTJjY2FkNDY5ODcwNzc1MTk5Nzg3MjBmMmMzMzUiLCJzaXRlIjo3NywidG9rZW4iOiIxNy1pS2JzMHpuTWdJMFhqTC1RMndDUSJ9; _hvn_lgc_=77; havana_lgc_exp=1782351034419; sdkSilent=1779845436665; tfstk=gILn3e4ubOwbcrwZo87IjLv9hWiOJw_5XLUReaBrbOW_pJUpa8vkQKdLJUdPELvOCyKKAgBuZwT9vzBKdaAyHaDxHq3vOB_hzxHxAY4lfw1u8yzze15NMafUC3KnwB_5zAFTzm3DOpj4H3WFzfbNZ6VFzTSF_ffliT7PLgyabsWNUaJPUNRNa6VFUMWU7ff5Q67zYalG7O1lzTJPzfAZ9fUPnU867xOUPbRyjrYCtMX2T9Rp1FrC7kOfITXy-6AiWBBG61LGtMXV26fj4EA2TE1kPjrlEItep19ooAbw-pYFja0u5wdDbpjMxY4GfhRXzGxsnoOXTpxV0eui1GYBMwWMPba5LHdyygYE37BeRpLGcUwnBTKv6eSM3AUMFgxe0w8onVSrDlrVFCa5_bLaVusF11XACZXNda6rnBlisoiCY11KHUhgby2bzzhKsfqbsM519xC..',
}

params = {
    'jsv': '2.7.2',
    'appKey': '34839810',
    't': '1779759142003',
    'sign': 'e1c1bf18dd50e7e66f6fc64d8834ce7f',
    'v': '1.0',
    'type': 'originaljson',
    'accountSite': 'xianyu',
    'dataType': 'json',
    'timeout': '20000',
    'api': 'mtop.taobao.idlemtopsearch.pc.search',
    'sessionOption': 'AutoLoginOnly',
    'spm_cnt': 'a21ybx.search.0.0',
    'spm_pre': 'a21ybx.home.searchActivate.4.4c053da66Thq2Y',
    'log_id': '4c053da66Thq2Y',
}

data = {
    'data': '{"pageNumber":1,"keyword":"狗狗","fromFilter":true,"rowsPerPage":30,"sortValue":"","sortField":"","customDistance":"","gps":"","propValueStr":{"searchFilter":"priceRange:400,undefined;"},"customGps":"","searchReqFromPage":"pcSearch","extraFilterValue":"{\\"divisionList\\":[{\\"province\\":\\"浙江\\",\\"city\\":\\"杭州\\"}],\\"excludeMultiPlacesSellers\\":\\"0\\",\\"extraDivision\\":\\"\\"}","userPositionJson":"{}"}',
}

response = requests.post(
    'https://h5api.m.goofish.com/h5/mtop.taobao.idlemtopsearch.pc.search/1.0/',
    params=params,
    cookies=cookies,
    headers=headers,
    data=data,
)

print(response.json())