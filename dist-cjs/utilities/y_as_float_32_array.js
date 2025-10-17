"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yAsFloat32Array = yAsFloat32Array;
const number_type_checkers_js_1 = require("../number_type_checkers.js");
function yAsFloat32Array(y) {
    if (y instanceof Float32Array)
        return y;
    else if (y instanceof Float64Array || y instanceof Int32Array || Array.isArray(y)) {
        const float32Array = y.map((v) => (0, number_type_checkers_js_1.asF32)(v));
        return Float32Array.from(float32Array);
    }
    else if (y instanceof BigInt64Array) {
        const float32Array = Array.from(y, (v) => (0, number_type_checkers_js_1.asF32)(v));
        return Float32Array.from(float32Array);
    }
    else {
        throw new Error(`[yAsFloat32Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`);
    }
}
