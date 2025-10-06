import { RidgeRegressionF64I64, RidgeRegressionF64Parameters, RidgeRegressionF64F64, RidgeRegressionF64BigI64, RidgeRegressionF64BigU64 } from '../../core-bindings/index.js';
import type { RidgeRegressionSolverName } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
import { type YTypeKey } from '../base_estimator.js';
import { BasePredictor } from '../base_predictor.js';
type RidgeRegressionRs = RidgeRegressionF64I64 | RidgeRegressionF64F64 | RidgeRegressionF64BigI64 | RidgeRegressionF64BigU64;
type RidgeRegressionParametersRs = RidgeRegressionF64Parameters;
interface IRidgeRegressionParameters {
    solver?: RidgeRegressionSolverName;
}
interface RidgeRegressionSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IRidgeRegressionParameters;
    yType: YTypeKey;
}
declare class RidgeRegression extends BasePredictor<RidgeRegressionRs, RidgeRegressionParametersRs, YType> {
    static readonly className = "RidgeRegression";
    readonly name: string;
    readonly config: IRidgeRegressionParameters;
    private estimatorClasses;
    constructor(params?: IRidgeRegressionParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): RidgeRegressionRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): RidgeRegressionSerializedData;
    static deserialize(data: RidgeRegressionSerializedData): RidgeRegression;
}
export default RidgeRegression;
