"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainTestSplit = trainTestSplit;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
function trainTestSplit(x, y, params) {
    x = x instanceof index_js_2.DenseMatrix ? x : index_js_2.DenseMatrix.f64(x);
    let shuffle = params?.shuffle === undefined ? true : params?.shuffle;
    if (y instanceof BigInt64Array) {
        let [xTrain, xTest, yTrain, yTest] = (0, index_js_1.trainTestSplitF64BigI64)(x.asF64(), y, params.testSize, shuffle, params.seed);
        return [new index_js_2.DenseMatrix(xTrain), new index_js_2.DenseMatrix(xTest), yTrain, yTest];
    }
    else if (y instanceof BigUint64Array) {
        let [xTrain, xTest, yTrain, yTest] = (0, index_js_1.trainTestSplitF64BigU64)(x.asF64(), y, params.testSize, shuffle, params.seed);
        return [new index_js_2.DenseMatrix(xTrain), new index_js_2.DenseMatrix(xTest), yTrain, yTest];
    }
    else if (y instanceof Float64Array || !y.every((val) => Number.isInteger(val))) {
        let ys = new Float64Array(y);
        let [xTrain, xTest, yTrain, yTest] = (0, index_js_1.trainTestSplitF64F64)(x.asF64(), ys, params.testSize, shuffle, params.seed);
        return [new index_js_2.DenseMatrix(xTrain), new index_js_2.DenseMatrix(xTest), yTrain, yTest];
    }
    let [xTrain, xTest, yTrain, yTest] = (0, index_js_1.trainTestSplitF64I64)(x.asF64(), y, params?.testSize, shuffle, params?.seed);
    return [new index_js_2.DenseMatrix(xTrain), new index_js_2.DenseMatrix(xTest), yTrain, yTest];
}
