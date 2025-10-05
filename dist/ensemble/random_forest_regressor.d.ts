import { RandomForestRegressorF64BigI64, RandomForestRegressorF64BigU64, RandomForestRegressorF64I64, RandomForestRegressorParameters } from '../../core-bindings/index.js';
import type { SplitCriterion } from '../../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
interface IRandomForestRegressorParameters {
    criterion?: SplitCriterion;
    maxDepth?: number;
    minSamplesLeaf?: bigint;
    minSamplesSplit?: bigint;
    nTrees?: number;
    m?: number;
    keepSamples?: boolean;
    seed?: number;
}
type RandomForestRegressorRs = RandomForestRegressorF64I64 | RandomForestRegressorF64BigI64 | RandomForestRegressorF64BigU64;
type RandomForestRegressorParametersRs = RandomForestRegressorParameters;
interface RandomForestRegressorSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IRandomForestRegressorParameters;
    yType: YTypeKey;
}
declare class RandomForestRegressor extends BasePredictor<RandomForestRegressorRs, RandomForestRegressorParametersRs, YType> {
    static readonly className = "RandomForestRegressor";
    readonly name: string;
    readonly config: IRandomForestRegressorParameters;
    private estimatorClasses;
    constructor(params?: IRandomForestRegressorParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): RandomForestRegressorRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): RandomForestRegressorSerializedData;
    static deserialize(data: RandomForestRegressorSerializedData): RandomForestRegressor;
}
export { RandomForestRegressor };
