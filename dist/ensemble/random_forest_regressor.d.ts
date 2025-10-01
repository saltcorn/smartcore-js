import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
interface RandomForestRegressorParams {
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
declare class RandomForestRegressor implements Estimator<XType, YType, RandomForestRegressor>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    static readonly className = "RandomForestRegressor";
    readonly name: string;
    constructor(params?: RandomForestRegressorParams);
    fit(x: XType, y: YType): RandomForestRegressor;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): RandomForestRegressor;
}
export { RandomForestRegressor };
