# 如何理解 wasm
wasm 就是个代码调用的事, 浏览器从远程拉取 wasm 代码(可以从网络控制台的 wasm 选项中看到),
js 使用 wasm 可以理解为在python 中调用 js 代码

instantiate(1,2) 参数1是wasm代码, 2是传入的一个对象
instantiateStreaming(1,2) 参数1是 wasm 流式响应对象, 2 是传入一个对象

# 如何定位 wasm 
搜 `WebAssembly.instantiateStreaming` , `WebAssembly.instantiate` 关键字
