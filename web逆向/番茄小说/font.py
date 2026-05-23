import requests
from fontTools import ttLib
import io

# 下载字体
url = "https://lf6-awef.bytetos.com/obj/awesome-font/c/e26e946d8b2ccb7.woff2"
r = requests.get(url)
font = ttLib.TTFont(io.BytesIO(r.content))

cmap = font.getBestCmap()
print(cmap)

# 页面中展示的文本
html_show_text = "《斩神》作家三九音域全新力作 |"
# 请求中返回的文本在控制台中的展示
response_console_show_text = '《斩》九域  |'
# print(ord(""))
