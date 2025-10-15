import {} from '../../index.js';
import { DenseMatrixF32, DenseMatrixF64, DenseMatrixU32, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU64, DenseMatrixU8, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../../linalg/dense-matrix/index.js';
import { DataFrame } from '../../data_frame.js';
function toDenseMatrixF32(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('f32');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.f32(x).asRsMatrix('f32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixF64(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('f64');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.f64(x).asRsMatrix('f64');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU32(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('u32');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.u32(x).asRsMatrix('u32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixI32(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('i32');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.i32(x).asRsMatrix('i32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixI64(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('i64');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.i64(x).asRsMatrix('i64');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU16(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('u16');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.u16(x).asRsMatrix('u16');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU8(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('u8');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.u8(x).asRsMatrix('u8');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixU64(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('u64');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.u64(x).asRsMatrix('u64');
    }
    else {
        throw new Error('TODO!');
    }
}
export { toDenseMatrixF32, toDenseMatrixF64, toDenseMatrixU32, toDenseMatrixI32, toDenseMatrixI64, toDenseMatrixU16, toDenseMatrixU8, toDenseMatrixU64, };
