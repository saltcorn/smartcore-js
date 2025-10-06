import { LassoF64I64, LassoParameters, LassoF64F64, LassoF64BigI64, LassoF64BigU64 } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { YType } from '../index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
type LassoRs = LassoF64I64 | LassoF64F64 | LassoF64BigI64 | LassoF64BigU64;
type LassoParametersRs = LassoParameters;
interface ILassoParameters {
    alpha?: number;
    normalize?: boolean;
    tol?: number;
    maxIter?: number;
}
interface LassoSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: ILassoParameters;
    yType: YTypeKey;
}
declare class Lasso extends BasePredictor<LassoRs, LassoParametersRs, YType> {
    static readonly className = "Lasso";
    readonly name: string;
    readonly config: ILassoParameters;
    private estimatorClasses;
    constructor(params?: ILassoParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): LassoRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): LassoSerializedData;
    static deserialize(data: LassoSerializedData): Lasso;
}
export default Lasso;
