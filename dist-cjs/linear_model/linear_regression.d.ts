import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, LinearRegressionF64BigI64, LinearRegressionF64BigU64 } from '../../core-bindings/index.js';
import type { LinearRegressionSolverName } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type LinearRegressionRs = LinearRegressionF64I64 | LinearRegressionF64F64 | LinearRegressionF64BigI64 | LinearRegressionF64BigU64;
type LinearRegressionParametersRs = LinearRegressionParameters;
interface ILinearRegressionParameters {
    solver?: LinearRegressionSolverName;
}
interface LinearRegressionSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: ILinearRegressionParameters;
    yType: YTypeKey;
}
declare class LinearRegression extends BasePredictor<LinearRegressionRs, LinearRegressionParametersRs, YType> {
    static readonly className = "LinearRegression";
    readonly name: string;
    readonly config: ILinearRegressionParameters;
    private estimatorClasses;
    constructor(params?: ILinearRegressionParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): LinearRegressionRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): LinearRegressionSerializedData;
    static deserialize(data: LinearRegressionSerializedData): LinearRegression;
}
export default LinearRegression;
