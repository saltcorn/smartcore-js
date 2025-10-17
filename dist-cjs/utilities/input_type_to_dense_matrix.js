"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputTypeToDenseMatrix = inputTypeToDenseMatrix;
const data_frame_js_1 = require("../data_frame.js");
const index_js_1 = require("../linalg/index.js");
const index_js_2 = require("./index.js");
function inputTypeToDenseMatrix(x) {
    if (x instanceof index_js_1.DenseMatrix)
        return x;
    if (x instanceof data_frame_js_1.DataFrame)
        return (0, index_js_2.dataFrameToDenseMatrix)(x);
    if (Array.isArray(x))
        return new index_js_1.DenseMatrix(x);
    else
        throw new Error(`Converting input of type ${typeof x} to DenseMatrix failed`);
}
