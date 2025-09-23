import { LogisticRegressionF64I64, LogisticRegressionParametersF64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { LogisticRegressionSolverName } from '../../core-bindings/index.js';
type LogisticRegressionRs = LogisticRegressionF64I64;
declare class LogisticRegressionPredictor {
    inner: LogisticRegressionRs;
    constructor(inner: LogisticRegressionRs);
    predict(x: DenseMatrix | number[][]): number[] | Float64Array;
    serialize(): Buffer<ArrayBufferLike>;
    static deserialize(data: Buffer): LogisticRegressionPredictor;
}
type LogisticRegressionParameters = LogisticRegressionParametersF64;
interface LogisticRegressionParametersValues {
    alpha?: number;
    solver?: LogisticRegressionSolverName.LBFGS;
}
declare class LogisticRegression {
    parameters: LogisticRegressionParameters;
    constructor(params?: LogisticRegressionParametersValues);
    fit(x: DenseMatrix | number[][], y: number[], parameters: LogisticRegressionParametersF64): LogisticRegressionPredictor;
}
export default LogisticRegression;
