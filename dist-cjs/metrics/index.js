"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accuracyScore = accuracyScore;
const index_js_1 = require("../core-bindings/index.js");
const index_js_2 = require("../index.js");
function getNormalizedYType(yTrue, yPred) {
    if (yTrue instanceof Float64Array || yPred instanceof Float64Array) {
        const yTrueConverted = yTrue instanceof Float64Array
            ? yTrue
            : Float64Array.from(yTrue, (x) => index_js_2.numberTypeCheckers.asF64(x));
        const yPredConverted = yPred instanceof Float64Array
            ? yPred
            : Float64Array.from(yPred, (x) => index_js_2.numberTypeCheckers.asF64(x));
        return [yTrueConverted, yPredConverted];
    }
    if (yTrue instanceof BigInt64Array || yPred instanceof BigInt64Array)
        return [BigInt64Array.from(yTrue), BigInt64Array.from(yPred)];
    if (yTrue instanceof BigUint64Array || yPred instanceof BigUint64Array)
        return [BigUint64Array.from(yTrue), BigUint64Array.from(yPred)];
    return [Int32Array.from(yTrue), Int32Array.from(yPred)];
}
function accuracyScore(yTrue, yPred) {
    let [yTrueTyped, yPredTyped] = getNormalizedYType((0, index_js_2.asTypedY)(yTrue), (0, index_js_2.asTypedY)(yPred));
    if (yTrueTyped instanceof Float64Array && yPredTyped instanceof Float64Array) {
        return new index_js_1.AccuracyF64().getScore(yTrueTyped, yPredTyped);
    }
    else if (yTrueTyped instanceof BigInt64Array && yPredTyped instanceof BigInt64Array) {
        return new index_js_1.AccuracyI64().getScore(yTrueTyped, yPredTyped);
    }
    else if (yTrueTyped instanceof BigUint64Array && yPredTyped instanceof BigUint64Array) {
        return new index_js_1.AccuracyU64().getScore(yTrueTyped, yPredTyped);
    }
    else if (yTrueTyped instanceof Int32Array && yPredTyped instanceof Int32Array) {
        return new index_js_1.AccuracyI32().getScore(yTrueTyped, yPredTyped);
    }
    throw new Error(`Unsupported data type for input arrays: ` +
        `yTrue=${yTrue.constructor?.name || typeof yTrue}, ` +
        `yPred=${yPred.constructor?.name || typeof yPred}.`);
}
