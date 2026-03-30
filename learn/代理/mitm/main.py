# hook.py
from mitmproxy import http

class Hook:
    def response(self, flow: http.HTTPFlow):
        req = flow.request
        resp = flow.response

        print("beforeSendResponse")
        print(req.method, req.url)
        print(resp.headers.get("content-type"))

        content_type = resp.headers.get("content-type", "")

        if "javascript" in content_type or "text/html" in content_type:
            body = resp.get_text(strict=False)

            # 👇 你的 injectHook
            body = body.replace(
                "</head>",
                "<script>console.log('inject')</script></head>"
            )

            resp.set_text(body)

addons = [Hook()]
