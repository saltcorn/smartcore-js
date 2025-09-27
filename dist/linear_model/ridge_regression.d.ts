import { RidgeRegressionF64I64, RidgeRegressionF64Parameters, RidgeRegressionF64F64, RidgeRegressionF64BigI64, RidgeRegressionF64BigU64 } from '../../core-bindings/index.js';
import type { RidgeRegressionSolverName } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type RidgeRegressionRs = RidgeRegressionF64I64 | RidgeRegressionF64F64 | RidgeRegressionF64BigI64 | RidgeRegressionF64BigU64;
interface IRidgeRegressionParameters {
    solver?: RidgeRegressionSolverName;
}
declare enum EstimatorType {
    F64BigI64 = 0,
    F64BigU64 = 1,
    F64I64 = 2,
    F64F64 = 3
}
declare class RidgeRegression implements Estimator<XType, YType, RidgeRegression>, Predictor<XType, YType> {
    parameters: RidgeRegressionF64Parameters;
    estimator: RidgeRegressionRs | null;
    constructor(params?: IRidgeRegressionParameters);
    fit(x: XType, y: YType): RidgeRegression;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): RidgeRegression;
}
export default RidgeRegression;
