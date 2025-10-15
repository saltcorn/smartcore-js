"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDenseMatrixF32 = toDenseMatrixF32;
exports.toDenseMatrixF64 = toDenseMatrixF64;
exports.toDenseMatrixU32 = toDenseMatrixU32;
exports.toDenseMatrixI32 = toDenseMatrixI32;
exports.toDenseMatrixI64 = toDenseMatrixI64;
exports.toDenseMatrixU16 = toDenseMatrixU16;
exports.toDenseMatrixU8 = toDenseMatrixU8;
exports.toDenseMatrixU64 = toDenseMatrixU64;
const index_js_1 = require("../../linalg/dense-matrix/index.js");
const data_frame_js_1 = require("../../data_frame.js");
function toDenseMatrixF32(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('f32');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.f32(x).asRsMatrix('f32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixF64(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('f64');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.f64(x).asRsMatrix('f64');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU32(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('u32');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.u32(x).asRsMatrix('u32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixI32(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('i32');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.i32(x).asRsMatrix('i32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixI64(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('i64');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.i64(x).asRsMatrix('i64');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU16(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('u16');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.u16(x).asRsMatrix('u16');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU8(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('u8');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.u8(x).asRsMatrix('u8');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU64(x) {
    if (x instanceof data_frame_js_1.DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof index_js_1.DenseMatrix) {
        return x.asRsMatrix('u64');
    }
    else if (Array.isArray(x)) {
        return index_js_1.DenseMatrix.u64(x).asRsMatrix('u64');
    }
    else {
        throw new Error('TODO!');
    }
}
