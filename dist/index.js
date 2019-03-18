"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = {};
exports._ = _;
function holder(lambda, ...inputArgus) {
    if (inputArgus.filter(v => v === _).length === 0) {
        return lambda(...inputArgus);
    }
    else {
        return ((...nextArgus) => {
            let i = 0;
            const finalArgus = inputArgus.map(v => v == _ ? nextArgus[i++] : v);
            return lambda(...finalArgus);
        });
    }
}
exports.holder = holder;
const lambda = (...args) => args[1].reduce((a, b) => a + b) * args[0].length ** (args[2] ? 2 : 3);
console.log(holder(lambda, _, [1, 2, 3], true)('hello'));
console.log(holder(lambda, 'hello', [1, 2, 3], true));
//# sourceMappingURL=index.js.map