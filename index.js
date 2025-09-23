"use strict";
// import {
//   LinearRegressionF64I64,
//   LinearRegressionParameters,
//   LinearRegressionF64F64,
//   DenseMatrixF64,
//   DenseMatrixI64,
//   DenseMatrixU64,
// } from './core-bindings/index.js'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// type LinearRegressionRs = LinearRegressionF64I64 | LinearRegressionF64F64
// class DenseMatrix {
//   inner: DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64
//   constructor(data: number[][], columnMajor?: boolean | undefined | null) {
//     if (!(data instanceof Array)) {
//       throw new Error('Expected data to be an array.')
//     }
//     let nrows = data.length
//     let ncols = data[0] instanceof Array ? data[0].length : 0
//     let valuesFlat = data.flat()
//     if (valuesFlat.every((val) => Number.isInteger(val))) {
//       this.inner = new DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor)
//     } else {
//       this.inner = new DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor)
//     }
//   }
// }
// class LinearRegression {
//   inner: LinearRegressionRs
//   constructor(inner: LinearRegressionRs) {
//     this.inner = inner
//   }
//   fit(x: DenseMatrix | number[][], y: number[], parameters: LinearRegressionParameters): LinearRegression {
//     let matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x)
//     if (!y || y.length === 0) {
//       throw new Error('Input arrays cannot be empty.')
//     }
//     if (matrix.inner instanceof DenseMatrixF64) {
//       if (y.every((val) => Number.isInteger(val))) {
//         this.inner = LinearRegressionF64I64.fit(matrix.inner, y, parameters)
//       } else {
//         this.inner = LinearRegressionF64F64.fit(matrix.inner, new Float64Array(y), parameters)
//       }
//     } else {
//       throw new Error('Unsupported data type for input arrays.')
//     }
//     return this
//   }
//   predict(x: DenseMatrix | number[][]): LinearRegression {
//     let matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x)
//     if (matrix.inner instanceof DenseMatrixF64) {
//       this.inner.predict(matrix.inner)
//     } else {
//       throw new Error('Unsupported data type for input arrays.')
//     }
//     return this
//   }
//   serialize() {
//     return this.inner?.serialize()
//   }
//   static deserialize(data: Buffer): LinearRegression {
//     try {
//       let inner = LinearRegressionF64I64.deserialize(data)
//       return new LinearRegression(inner)
//     } catch (e) {
//       try {
//         let inner = LinearRegressionF64F64.deserialize(data)
//         return new LinearRegression(inner)
//       } catch (e) {
//         throw e
//       }
//     }
//   }
// }
// export { LinearRegression }
__exportStar(require("./src-js/index.js"), exports);
