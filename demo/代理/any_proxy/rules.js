module.exports = {
  // 某些情况下请求发送之前就替换会失败，所以只替换响应的body比较稳妥

  /**
   * AnyProxy 生命周期钩子：beforeSendResponse
   *
   * 触发时机：
   * - 请求已经发送到真实服务器
   * - 已经拿到服务端响应
   * - 响应尚未返回给客户端
   *
   * 适合做的事情：
   * - 修改响应头
   * - 修改响应 body
   * - 注入 JS / HTML / CSS
   */
  *beforeSendResponse(requestDetail, responseDetail) {
    /**
     * 将请求与响应的完整信息交给全局 hook 组件处理
     *
     * process 内部通常会：
     * - 判断 Content-Type 是否为 JS / HTML
     * - 解码响应 body
     * - 对 JS 代码执行 injectHook
     * - 再重新写回 responseDetail
     */
    console.log("beforeSendResponse", requestDetail, responseDetail);
  },
};
