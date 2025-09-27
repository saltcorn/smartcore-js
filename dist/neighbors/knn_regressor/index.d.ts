import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js';
import type { XType, YType } from '../../index.js';
import type { Estimator, Predictor } from '../../pipeline/index.js';
declare enum DistanceType {
    EUCLIDIAN = 0,
    HAMMING = 1,
    MANHATTAN = 2,
    MAHALANOBIS = 3,
    MINKOWSKI = 4
}
interface IKNNRegressorParameters {
    k?: number;
    algorithm?: KNNAlgorithmName;
    weight?: KNNWeightFunction;
    distance?: DistanceType;
    p?: number;
    data?: XType;
}
declare enum EstimatorType {
    F64F64 = 0,
    F64I64 = 1,
    F64BigI64 = 2,
    F64BigU64 = 3
}
declare class KNNRegressor implements Estimator<XType, YType, KNNRegressor>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNRegressorParameters);
    fit(x: XType, y: YType): KNNRegressor;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType, distanceType: DistanceType): KNNRegressor;
}
export { KNNRegressor, type IKNNRegressorParameters, EstimatorType };
