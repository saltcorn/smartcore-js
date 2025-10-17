import { asF64 } from '../number_type_checkers.js';
function yAsFloat64Array(y) {
    if (y instanceof Float64Array)
        return y;
    else if (y instanceof Float64Array || y instanceof Int32Array || Array.isArray(y)) {
        const float64Array = y.map((v) => asF64(v));
        return Float64Array.from(float64Array);
    }
    else if (y instanceof BigInt64Array) {
        const float64Array = Array.from(y, (v) => asF64(v));
        return Float64Array.from(float64Array);
    }
    else {
        throw new Error(`[yAsFloat64Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`);
    }
}
export { yAsFloat64Array };
