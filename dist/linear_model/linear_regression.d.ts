import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, LinearRegressionF64BigI64, LinearRegressionF64BigU64 } from '../../core-bindings/index.js';
import type { LinearRegressionSolverName } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type LinearRegressionRs = LinearRegressionF64I64 | LinearRegressionF64F64 | LinearRegressionF64BigI64 | LinearRegressionF64BigU64;
interface ILinearRegressionParameters {
    solver?: LinearRegressionSolverName;
}
declare enum EstimatorType {
    F64BigI64 = 0,
    F64BigU64 = 1,
    F64I64 = 2,
    F64F64 = 3
}
declare class LinearRegression implements Estimator<XType, YType, LinearRegression>, Predictor<XType, YType> {
    parameters: LinearRegressionParameters;
    estimator: LinearRegressionRs | null;
    constructor(params?: ILinearRegressionParameters);
    fit(x: XType, y: YType): LinearRegression;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): LinearRegression;
}
export default LinearRegression;
