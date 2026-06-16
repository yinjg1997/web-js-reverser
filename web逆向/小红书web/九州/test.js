const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = {
    // window: globalThis,
    // globalThis: globalThis,
    console: console,
    performance: require('perf_hooks').performance,
    TextEncoder: require('util').TextEncoder,
    Event: function Event(){},
};
vm.createContext(sandbox);
let code = ""
for (const f of ['./x-s/env.js', './x-s/mnsv2.js']) {
    // code = code + "\n" + fs.readFileSync(path.join(__dirname, f), 'utf8');
    code = fs.readFileSync(path.join(__dirname, f), 'utf8');
    vm.runInContext(code, sandbox);
}
// console.log(code)
// vm.runInContext(code, sandbox);
// console.log(sandbox)
console.log(sandbox.window.mnsv2)