"use strict";
// import { type InputType } from '../../index.js'
// import {
//   DenseMatrixF32,
//   DenseMatrixF64,
//   DenseMatrixU32,
//   DenseMatrixI32,
//   DenseMatrixI64,
//   DenseMatrixU16,
//   DenseMatrixU64,
//   DenseMatrixU8,
// } from '../../core-bindings/index.js'
// import { DenseMatrix } from '../../linalg/dense-matrix/index.js'
// import { DataFrame } from '../../data_frame.js'
// function toDenseMatrixF32(x: InputType): DenseMatrixF32 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('f32') as DenseMatrixF32
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.f32(x).asRsMatrix('f32') as DenseMatrixF32
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixF64(x: InputType): DenseMatrixF64 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('f64') as DenseMatrixF64
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.f64(x).asRsMatrix('f64') as DenseMatrixF64
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixU32(x: InputType): DenseMatrixU32 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('u32') as DenseMatrixU32
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.u32(x).asRsMatrix('u32') as DenseMatrixU32
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixI32(x: InputType): DenseMatrixI32 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('i32') as DenseMatrixI32
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.i32(x).asRsMatrix('i32') as DenseMatrixI32
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixI64(x: InputType): DenseMatrixI64 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('i64') as DenseMatrixI64
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.i64(x).asRsMatrix('i64') as DenseMatrixI64
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixU16(x: InputType): DenseMatrixU16 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('u16') as DenseMatrixU16
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.u16(x).asRsMatrix('u16') as DenseMatrixU16
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixU8(x: InputType): DenseMatrixU8 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('u8') as DenseMatrixU8
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.u8(x).asRsMatrix('u8') as DenseMatrixU8
//   } else {
//     throw new Error('TODO!')
//   }
// }
// function toDenseMatrixU64(x: InputType): DenseMatrixU64 {
//   if (x instanceof DataFrame) {
//     throw new Error('Unimplemented!')
//   } else if (x instanceof DenseMatrix) {
//     return x.asRsMatrix('u64') as DenseMatrixU64
//   } else if (Array.isArray(x)) {
//     return DenseMatrix.u64(x).asRsMatrix('u64') as DenseMatrixU64
//   } else {
//     throw new Error('TODO!')
//   }
// }
// export {
//   toDenseMatrixF32,
//   toDenseMatrixF64,
//   toDenseMatrixU32,
//   toDenseMatrixI32,
//   toDenseMatrixI64,
//   toDenseMatrixU16,
//   toDenseMatrixU8,
//   toDenseMatrixU64,
// }
