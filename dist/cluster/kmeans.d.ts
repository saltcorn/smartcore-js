import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
interface KMeansParams {
    maxIter?: number;
    k?: number;
}
declare enum EstimatorType {
    F64I64 = 0,
    F64BigI64 = 1,
    F64F64 = 2
}
declare class KMeans implements Estimator<XType, YType, KMeans>, Predictor<XType, YType> {
    private parameters;
    private estimator;
    static readonly className = "KMeans";
    readonly name: string;
    constructor(params?: KMeansParams);
    fit(x: XType, y: YType): KMeans;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType): KMeans;
}
export { KMeans };
