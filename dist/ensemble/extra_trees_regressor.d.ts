import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
interface ExtraTreesRegressorParams {
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
    F64BigU64 = 2,
    F64F64 = 3
}
declare class ExtraTreesRegressor implements Estimator<XType, YType, ExtraTreesRegressor>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    static readonly className = "ExtraTreesRegressor";
    readonly name: string;
    constructor(params?: ExtraTreesRegressorParams);
    fit(x: XType, y: YType): ExtraTreesRegressor;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): ExtraTreesRegressor;
}
export { ExtraTreesRegressor };
