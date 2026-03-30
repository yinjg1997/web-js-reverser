// ========================================XMLHttpRequest Start====================================
function XMLHttpRequest() {

}
XMLHttpRequest.prototype = {
    open: function open() {},
    send: function send() {},
    setRequestHeader: function setRequestHeader() {},
    addEventListener: function addEventListener() {},
}

set_func_native(XMLHttpRequest);
window.XMLHttpRequest = XMLHttpRequest;
// ========================================XMLHttpRequest End====================================
