// ========================================Screen Start====================================
function Screen() {
    this.width = 1920;
    this.height = 1080;
    this.availWidth = 1440;
    this.availHeight = 900;
    this.colorDepth = 24;
    this.pixelDepth = 24;
}

Screen.prototype = {
    constructor: Screen,
    width: 1920,
    height: 1080,
}
Object.defineProperties(Screen.prototype, {
    [Symbol.toStringTag]: {
        value: "Screen",
        configurable: true
    }
})
set_func_native(Screen);

screen = new Screen();
Object.setPrototypeOf(screen, Screen.prototype)
window.screen = screen;
window.Screen = Screen;
// ========================================Screen End====================================
