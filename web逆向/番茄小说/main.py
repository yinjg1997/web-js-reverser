import json
from pathlib import Path

import requests


cmap = json.loads(Path(__file__).with_name('cmap.json').read_text(encoding='utf-8'))
char_map = {
    entry['char']: entry['ocr_text']
    for entry in cmap.values()
    if entry['ocr_text']
}


def decode_text(value):
    return ''.join(char_map.get(char, char) for char in value)


def decode_data(value):
    if isinstance(value, dict):
        return {key: decode_data(item) for key, item in value.items()}
    if isinstance(value, list):
        return [decode_data(item) for item in value]
    if isinstance(value, str):
        return decode_text(value)
    return value


cookies = {
    # 'Hm_lvt_2667d29c8e792e6fa9182c20a3013175': '1779500360',
    # 'Hm_lpvt_2667d29c8e792e6fa9182c20a3013175': '1779519833',
    # 'csrf_session_id': '5cb238a01d6e57fdf7f339557bd2a265',
    # 's_v_web_id': 'verify_mpi05vum_uI2rc5gs_Nq6M_4Esb_ABuE_3Mo9WVIWcyOI',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://fanqienovel.com/library',
    'sec-ch-ua': '"Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
}

params = {
    'page_count': '18',
    'page_index': '0',
    'gender': '-1',
    'category_id': '-1',
    'creation_status': '-1',
    'word_count': '-1',
    'book_type': '-1',
    'sort': '0',
    # 'msToken': 'aW6DnlXuxEOo84NYlhi8FH_-2OqA1oXe0d6Y-QUSG4clbek7E2U82LZpeB9dYhZAC0Ha3_2BSjfPC6nBTuZN4B29ASHVuaAR2l_JHrLiv2KdhvopW0f_xpvu0uVIpTbhW5SutnA1mKmmQjc=',
    # 'a_bogus': 'x6MQfcZBMsm1ujfBJwkz9SGm5/R0YW5cgZEzolerjzo4',
}

response = requests.get(
    'https://fanqienovel.com/api/author/library/book_list/v0/',
    params=params,
    cookies=cookies,
    headers=headers,
)

print(decode_data(response.json()))
