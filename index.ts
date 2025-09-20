// import {
//   LinearRegressionF32F32,
//   LinearRegressionF32U32,
//   LinearRegressionParameters,
//   LinearRegressionF64F64,
// } from './core-bindings/index.js'

// type LinearRegressionRs = LinearRegressionF32F32 | LinearRegressionF64F64 | LinearRegressionF32U32

// class LinearRegression {
//   inner: LinearRegressionRs

//   constructor(inner: LinearRegressionRs) {
//     this.inner = inner
//   }

//   static fit(x: number[][], y: number[] | bigint[]): LinearRegression {
//     if (!x || !y || x.length === 0 || y.length === 0) {
//       throw new Error('Input arrays cannot be empty.')
//     }

//     const xFlat = x.flat()
//     let inner: unknown

//     if (typeof xFlat[0] === 'bigint') {
//       if (y.every((val) => typeof val === 'bigint')) {
//         const xArray = new BigInt64Array(xFlat as bigint[])
//         const yArray = new BigInt64Array(y as bigint[])
//         inner = LinearRegressionU64U64.fit(xArray, yArray)
//       } else {
//         throw new Error("Mismatch: 'x' is BigInt, but 'y' is not fully BigInt.")
//       }
//     } else if (typeof xFlat[0] === 'number') {
//       // All elements must be numbers for Float64Array
//       if (y.every((val) => typeof val === 'number')) {
//         const xArray = new Float64Array(xFlat as number[])
//         const yArray = new Float64Array(y as number[])
//         // inner = new LinearRegressionF32F32(xArray, yArray); // Assuming this external class exists
//         console.log('Constructing Number-based regression model...')
//         inner = { x: xArray, y: yArray } // Placeholder for external constructor
//       } else {
//         throw new Error("Mismatch: 'x' is Number, but 'y' is not fully Number.")
//       }
//     } else {
//       throw new Error('Unsupported data type for input arrays.')
//     }

//     // Return a new instance of the class with the initialized `inner` object
//     return new LinearRegression(inner)
//   }
// }

// export { LinearRegression }
