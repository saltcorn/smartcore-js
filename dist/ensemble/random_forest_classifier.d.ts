import { RandomForestClassifierF64BigI64, RandomForestClassifierF64BigU64, RandomForestClassifierF64I64, RandomForestClassifierParameters, type SplitCriterion } from '../core-bindings/index.js';
import type { YType } from '../index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BasePredictor } from '../base_predictor.js';
import { type YTypeKey } from '../base_estimator.js';
interface IRandomForestClassifierParameters {
    criterion?: SplitCriterion;
    maxDepth?: number;
    minSamplesLeaf?: bigint;
    minSamplesSplit?: bigint;
    nTrees?: number;
    m?: number;
    keepSamples?: boolean;
}
type RandomForestClassifierRs = RandomForestClassifierF64I64 | RandomForestClassifierF64BigI64 | RandomForestClassifierF64BigU64;
type RandomForestClassifierParametersRs = RandomForestClassifierParameters;
interface RandomForestClassifierSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IRandomForestClassifierParameters;
    yType: YTypeKey;
}
declare class RandomForestClassifier extends BasePredictor<RandomForestClassifierRs, RandomForestClassifierParametersRs, YType> {
    static readonly className = "RandomForestClassifier";
    readonly name: string;
    readonly config: IRandomForestClassifierParameters;
    private estimatorClasses;
    constructor(params?: IRandomForestClassifierParameters);
    protected fitEstimator(matrix: DenseMatrix, y: YType): RandomForestClassifierRs;
    protected getComponentColumnName(index: number): string;
    predictMatrix(matrix: DenseMatrix): YType;
    serialize(): RandomForestClassifierSerializedData;
    static deserialize(data: RandomForestClassifierSerializedData): RandomForestClassifier;
}
export { RandomForestClassifier };
