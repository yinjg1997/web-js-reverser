/**
 *
 * TODO
 * 请教个问题老师, 空了辛苦解惑下[抱拳]
逆向百例 53 节, 补环境有段代码
screen = watch({
    width: 1920,
    height: 1080
}, "screen");
window.screen = screen;

为什么这里的还要写window.screen = screen;
window是globalThis的代理对象,
screen = watch({}, "screen"); 不是会自动挂在globalThis上嘛?

然后同样的问题还有55 节, 6分10秒, 说的location 也要写window.location = location;

 */
window = watch(globalThis);

// 能挂载到 global 上
abc_obj = { abc: 123 };
console.log(window.abc_obj);
// var 修饰后无法挂载到 global 上
var def_obj = { def: 456 };
console.log(window.def_obj);
