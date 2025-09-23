import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
type LinearRegressionRs = LinearRegressionF64I64 | LinearRegressionF64F64;
declare class LinearRegression {
    inner: LinearRegressionRs;
    constructor(inner: LinearRegressionRs);
    fit(x: DenseMatrix | number[][], y: number[], parameters: LinearRegressionParameters): LinearRegression;
    predict(x: DenseMatrix | number[][]): number[] | Float64Array;
    serialize(): Buffer<ArrayBufferLike>;
    static deserialize(data: Buffer): LinearRegression;
}
export default LinearRegression;
