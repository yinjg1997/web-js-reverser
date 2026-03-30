// https://antispider8.scrape.center/

// 无限debugger是 setInterval 造成的, 直接让setInterval等于空函数可解,
// 放的越早越好, 可以先在一个地方断掉,然后找到最远栈, 在那个地方打断点,然后空函数处理 ( 在控制台中设置空函数/hook, 刷新页面后就没了)
// setInterval(() => {
//     Function("debugger").call();
// }, 1000);

setInterval = function () {}

// 另一种解决方案是在无限debugger 处进行文件替换, 右键内容替换,然后将debugger 删掉然后保存就ok了

