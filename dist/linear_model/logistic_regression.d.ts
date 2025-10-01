import type { LogisticRegressionSolverName } from '../../core-bindings/index.js';
import type { Estimator, Predictor, SerDe } from '../pipeline/index.js';
import type { YType, XType } from '../index.js';
declare enum EstimatorType {
    F64BigI64 = 0,
    F64BigU64 = 1,
    F64I64 = 2
}
interface LogisticRegressionParametersValues {
    alpha?: number;
    solver?: LogisticRegressionSolverName.LBFGS;
}
declare class LogisticRegression implements Estimator<XType, YType, LogisticRegression>, Predictor<XType, YType>, SerDe<LogisticRegression> {
    private estimator;
    private parameters;
    static readonly className = "LogisticRegression";
    readonly name: string;
    constructor(params?: LogisticRegressionParametersValues);
    predict(x: XType): YType;
    fit(x: XType, y: YType): LogisticRegression;
    serialize(): Buffer;
    deserialize(data: Buffer): LogisticRegression;
    static deserialize(data: Buffer, estimatorType: EstimatorType): LogisticRegression;
}
export default LogisticRegression;
