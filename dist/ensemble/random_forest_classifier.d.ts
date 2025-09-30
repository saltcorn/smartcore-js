import type { SplitCriterion } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
interface RandomForestClassifierParams {
    criterion?: SplitCriterion;
    maxDepth?: number;
    minSamplesLeaf?: bigint;
    minSamplesSplit?: bigint;
    nTrees?: number;
    m?: number;
    keepSamples?: boolean;
}
declare enum EstimatorType {
    F64I64 = 0,
    F64BigI64 = 1,
    F64BigU64 = 2
}
declare class RandomForestClassifier implements Estimator<XType, YType, RandomForestClassifier>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    constructor(params?: RandomForestClassifierParams);
    fit(x: XType, y: YType): RandomForestClassifier;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): RandomForestClassifier;
}
export { RandomForestClassifier };
