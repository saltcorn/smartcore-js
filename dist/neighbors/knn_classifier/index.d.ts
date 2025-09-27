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
interface IKNNClassifierParameters {
    k?: number;
    algorithm?: KNNAlgorithmName;
    weight?: KNNWeightFunction;
    distance?: DistanceType;
    p?: number;
    data?: XType;
}
declare enum EstimatorType {
    F64I64 = 0,
    F64BigI64 = 1,
    F64BigU64 = 2
}
declare class KNNClassifier implements Estimator<XType, YType, KNNClassifier>, Predictor<XType, YType> {
    private estimator;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): KNNClassifier;
    predict(x: XType): YType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer, estimatorType: EstimatorType, distanceType: DistanceType): KNNClassifier;
}
export { KNNClassifier, type IKNNClassifierParameters, EstimatorType };
