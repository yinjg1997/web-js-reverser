// ================================Location Start================================
function Location() {
}

set_func_native(Location);

Location.prototype = {
    constructor: Location,
    href: "https://www.xiaohongshu.com/",
    protocol: "https:",
    host: "www.xiaohongshu.com",
    hostname: "www.xiaohongshu.com",
    port: "",
    pathname: "/explore",
    search: "",
    hash: "",
}
Object.defineProperties(Location.prototype, {
    [Symbol.toStringTag]: {
        value: "Location",
        configurable: true
    }
})

location = new Location();
Object.setPrototypeOf(location, Location.prototype)
window.location = location;
window.Location = Location;
// ================================Location End================================
