import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from './core-bindings/index.js';
type LinearRegressionRs = LinearRegressionF64I64 | LinearRegressionF64F64;
declare class DenseMatrix {
    inner: DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64;
    constructor(data: number[][], columnMajor?: boolean | undefined | null);
}
declare class LinearRegression {
    inner: LinearRegressionRs | null;
    constructor();
    fit(x: DenseMatrix | number[][], y: number[], parameters: LinearRegressionParameters): LinearRegression;
}
export { LinearRegression };
