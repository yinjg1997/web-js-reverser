import requests
import datetime
params = {
    "group": "ws-group",  # 接口名称
    "action": "clientTime",  # 调用的服务名
    "code": f"serverTime = {datetime.datetime.now().time()}",  # 传递的参数
}
res = requests.get("http://127.0.0.1:5612/business/invoke", params=params)
print(res.text)