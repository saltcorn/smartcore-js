import { ExtraTreesRegressorF64BigU64, ExtraTreesRegressorF64BigI64, ExtraTreesRegressorF64I64, ExtraTreesRegressorParameters, ExtraTreesRegressorF64F64 } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
interface IExtraTreesRegressorParameters {
    maxDepth?: number;
    minSamplesLeaf?: bigint;
    minSamplesSplit?: bigint;
    nTrees?: number;
    m?: number;
    keepSamples?: boolean;
    seed?: number;
}
type ExtraTreesRegressorRs = ExtraTreesRegressorF64I64 | ExtraTreesRegressorF64BigI64 | ExtraTreesRegressorF64F64 | ExtraTreesRegressorF64BigU64;
type ExtraTreesRegressorParametersRs = ExtraTreesRegressorParameters;
interface ExtraTreesRegressorSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IExtraTreesRegressorParameters;
    yType: YTypeKey;
}
declare class ExtraTreesRegressor extends BasePredictor<ExtraTreesRegressorRs, ExtraTreesRegressorParametersRs, YType> {
    static readonly className = "ExtraTreesRegressor";
    readonly name: string;
    readonly config: IExtraTreesRegressorParameters;
    private estimatorClasses;
    constructor(params?: IExtraTreesRegressorParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): ExtraTreesRegressorRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): ExtraTreesRegressorSerializedData;
    static deserialize(data: ExtraTreesRegressorSerializedData): ExtraTreesRegressor;
}
export { ExtraTreesRegressor };
