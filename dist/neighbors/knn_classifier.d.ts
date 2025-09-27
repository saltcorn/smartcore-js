import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
interface KNNClassifierParams {
    maxDepth?: number;
    minSamplesLeaf?: bigint;
    minSamplesSplit?: bigint;
    nTrees?: number;
    m?: number;
    keepSamples?: boolean;
    seed?: number;
}
declare enum EstimatorType {
    F64I64 = 0,
    F64BigI64 = 1,
    F64BigU64 = 2
}
declare class KNNClassifier implements Estimator<XType, YType, KNNClassifier>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    constructor(params?: KNNClassifierParams);
    fit(x: XType, y: YType): KNNClassifier;
    predict(x: XType): YType;
    serialize(): any;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KNNClassifier;
}
export { KNNClassifier };
