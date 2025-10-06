import { LogisticRegressionF64I64, LogisticRegressionParametersF64, LogisticRegressionF64BigI64, LogisticRegressionF64BigU64, type LogisticRegressionSolverName } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type LogisticRegressionRs = LogisticRegressionF64I64 | LogisticRegressionF64BigI64 | LogisticRegressionF64BigU64;
type LogisticRegressionParametersRs = LogisticRegressionParametersF64;
interface ILogisticRegressionParameters {
    alpha?: number;
    solver?: LogisticRegressionSolverName.LBFGS;
}
interface LogisticRegressionSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: ILogisticRegressionParameters;
    yType: YTypeKey;
}
declare class LogisticRegression extends BasePredictor<LogisticRegressionRs, LogisticRegressionParametersRs, YType> {
    static readonly className = "LogisticRegression";
    readonly name: string;
    readonly config: ILogisticRegressionParameters;
    private estimatorClasses;
    constructor(params?: ILogisticRegressionParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): LogisticRegressionRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): LogisticRegressionSerializedData;
    static deserialize(data: LogisticRegressionSerializedData): LogisticRegression;
}
export default LogisticRegression;
