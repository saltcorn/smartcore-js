import { LogisticRegressionF64I64, LogisticRegressionParametersF64, LogisticRegressionF64BigI64, LogisticRegressionF64BigU64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { LogisticRegressionSolverName } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type LogisticRegressionRs = LogisticRegressionF64I64 | LogisticRegressionF64BigI64 | LogisticRegressionF64BigU64;
type LogisticRegressionParameters = LogisticRegressionParametersF64;
interface ILogicRegressionParameters {
    alpha?: number;
    solver?: LogisticRegressionSolverName.LBFGS;
}
interface LogisticRegressionSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: ILogicRegressionParameters;
    yType: YTypeKey;
}
declare class LogisticRegression extends BasePredictor<LogisticRegressionRs, LogisticRegressionParameters, YType> {
    static readonly className = "LogisticRegression";
    readonly name: string;
    readonly config: ILogicRegressionParameters;
    private estimatorClasses;
    constructor(params?: ILogicRegressionParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): LogisticRegressionRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): LogisticRegressionSerializedData;
    static deserialize(data: LogisticRegressionSerializedData): LogisticRegression;
}
export default LogisticRegression;
