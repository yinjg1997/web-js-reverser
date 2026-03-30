// https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50

# 如何判断是否为瑞数
rs的网站会请求两次page_url（文档请求），第1次page_url（文档请求）会返回一个cookie1，和一个响应体（HTML源码），以及请求响应码是202或者 412

~~清除cookie刷新, 若同一个doc请求了两次,第一次不带cookie并且状态码非200, 第二次请求带cookie且返回内容正常;~~  
~~接着看cookie, cookie中有两个name几乎一样的, 名字只在最后一个字母有区别~~

# 瑞数 3 板斧

一个 meta 中的 `content 作为密钥`, 两个 script 中的加密内容`_ts脚本`和`自执行解密函数脚本`

如下所示
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- fixme content 是密钥 -->
        <meta id="FbkwzLN5XOx0" content="Frc1QzzP.4RDpUAqdNQl.uYPq44Aco3Ex1f5tZl2yPCczm.g3pwpOeS_7lUhNGEv_CAl2AgnLfcBeEPsAXH6CjVqycZoL_goDw.TfOFGsGszZD8474CXl5HthkRvBLaNquw1Hgbyj7Xzqj8.GhgxClv5NTsqMp13rFGOlg.XlKfSPZL1MS0O5gGK.5ZnFiN923fKitww9Fg" r='m'>
        <!-- fixme ts 加密内容 -->
        <!--[if lt IE 9]><script r='m'>document.createElement("section")</script><![endif]-->
        <script type="text/javascript" r='m'>
            $_ts = window['$_ts'];
            if (!$_ts)
                $_ts = {};
            $_ts.nsd = 7364;
            $_ts.cd = "qE2ErrAlxcEmlAVPqk7UrpEqEG3Pru7elGqWr1Eciu01qcEqEGl4HAqmtGGlonEqiSQmEGW4maA1qkWrcpEqoAltlGqPrcEmiu0XrAAxrcq1qcEoEGA4HpEqkqEPqu7eEG34maW1qcElEP74H1EcrqLlDcEoiSQllGqWr1Eciu01qcEqEGl4H8qDrcCIqsVSqGVnJRZuTaeW5iKircb4dADSWZGpaFi5flDdcAU6YeUDTmGrWhpytYfhDGkfYeizmoqFw7E.qaAuraArvPakf22Zx9IwMY90w0zLpi0zVbg_pvwE5T2BA9V2H2.lWnZvEc7TUWEBEKT6pYTuNvV_10qa396FFCTLVDTuVegfiYyRJnGOB1ZuKme_tDdjMCZNKYa0hImCMC9XFUmzZnezQDy.tDdjMCe3h2a0hImCMC9XFUmzZnezQDy.tDdjMCe3UTLiqhwqsmWnAuw3_kfR3V70wb8.RufTRbYcM5RNVsy2VCNLebrUAs26wCHFY9Ydskan1QYf1lTDMVTldDAg1uYd3UvJKCfsR92YiXy6sK2zVVrcjKwsYO28WK4HY02oFUyW3BAz3DROHuQad1TNwO2lVYI_YkpxsupCJHWz3DROHuQad1TNwO2wW08B1V9TRYew1w9z3DROHuQad1TNwO2kIK.xYozbMvp7YQQzFU3ysDTYu2J7UUpXYsMKimJaYDJbwiy.Abx.ROeiyUlSYlRJ12h3Vmq5FOrQJIqaQTw6M0wM7KrGRkL0JKiSFUq5R9TJJiS_sswLA2m67KrGRkL0JKiSFUq5hDpv3tQaWbQ7MUQ_CKmLQvfh1Ososo7TiKp2W794wopgwuYk5aWkrAW6rqcXqSmzwvJ0i_aSiO0CHOqg.k3yHsEoqbhZ3O7CWaQoJ_G6qaZuJuWTjkLuWslTrqFvWkL6JsQaq3dG.Li84TRpiWVmSeHh5j80qSJVDUAgrxZl.A1wrqQlvAAor1xMBFs3BqDFbriTU1Iqtt5JNKqaXuBOJ8vXPQLCK6w9mqQiWt7aWOVSWOqnjqWcJAEJJsFNWs7uiuVaiRZL1DLTsTxueKf71KRSJuhE89wnQb7CFWeh8bwDYK0g0V2nYvxnRvoLRV0SJAQlqRg6qaAnraVCvBA0InybRKtu3by6hbR6MhJPwKaXRKYj7CmPQ1y2FUDu3KN.hbAL3ByfhCRSwcfP4oVBRbTjtDhBQnef36WLRIJBhCmzRcf2ZoQB3KT9Ic6_8C3NRCfahI2B3P29FCQz5KSztKpLQc6yMDTShbrG34J9FbWX3ogz5Dz7tKN.wc66Q6WNFvJvhIRGMc2.FK0zebT2tKzNwn6CQDaNFoALFdyShCen3cf.4CR9tKf0FC5uFKxu3nzLFH0BMCN2tC2L5neXws3.FUo5hCgS3nzNQFaBMvY2tC2j_1eXFb3.FK4NhCy7MnzNQ8ZBMvR.tC2S5bABFbrztD4Z8nejRKqLMBJfhCNX3PfX_CVBwU7.woOZh6J9Q1z0RBEBQ6YBt6pS4ceuwU3.wDUyh6JTwvZLQIm9h6Y.RcfSZCLBwUmOtokCR1e0wvZLQdgBQKGXwKY776mXQCq.wbsgh6mGQ1zCwI9BQKpat6wX76rfF1y03vbuQop9hvpuR4JawKEXwoTn76wPwnyuRUXuwCNOhvJzRd9BwCNawKmB_ne6IU3.QoUyh6YCRPznQXaBwURTt6xy5ne0FbpftoMaRKV6hvrNw4J0MbAXQDY676puwPydRbnu86JLhveLQ.J4M6R_t6SnZne4FDg.IP62FvWN36wBh8eBFvRCtCTSdGWkrAR3EDMUqawFxbYWqRzQxCw7rar8XCfNrAWdrqi.iGWlWaQmWxZkqaVcraArva3TJsE6JqDMJkquJGwQK.TT3vQPMCmG5CRSw2muwbOSRmra3clPx5TbQoYzFUw97KzbRDRPwvtSRKS6pCRvFMQ.wKpXQblzBCfbIc7fEPI6RbxfR6Y6VXzSFbz2xnZZBCfbIcrFkG";
            if ($_ts.lcd)
                $_ts.lcd();
        </script>
        <!-- fixme 自执行函数  -->
        <script type="text/javascript" charset="utf-8" src="/N7xexRXkVdNQ/Y5oPTJBkyHck.cca831b.js" r='m'></script>
    </head>
    <body></body>
</html>
<script type="text/javascript" r='m'>
    _$_7();
</script>
<a href="/N7xexRXkVdNQ/48b1a12/VHb8MfhF7KHT/xxd_xt8LI1tg/usa4_Z7PsVeQ" style="display:none">RPiG5viFbiD7</a>

```

# 如何解决?
确认是瑞数后, 瑞数的防御策略是先加载它们的脚本, 所以破解思路分为以下几步:
1. 添加`事件监听器中的脚本断点`, 然后清空cookie 并刷新
2. 断住后执行断点, 找到上面的 html 页面进行本地替换(方便做验证), 执行断点找到 `_ts 脚本`和 `自执行脚本`, 复制格式化前的代码
3. 将复制的代码推荐也分为3部分存储, env, ts, auto, 再用一个文件引入这个3个文件
4. 先补环境, 直接运行缺哪个补哪个, 可以配合getEnv和源代码, 生成cookie2的源代码是通过自执行脚本生成的字符串,然后通过eval执行, 不过瑞数用call隐藏了 eval, 因此我们在自执行代码中搜 call,然后找到第二个call就是eval的调用处, 然后打上断点, 执行到该断点处进行单步调试进入到生成cookie2的函数里, 这样可以准确的补环境