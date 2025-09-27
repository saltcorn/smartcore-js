import { type YType } from '../index.js';
declare function accuracyScore(yTrue: YType, yPred: YType): number;
declare enum DistanceType {
    EUCLIDIAN = 0,
    HAMMING = 1,
    MANHATTAN = 2,
    MAHALANOBIS = 3,
    MINKOWSKI = 4
}
export { accuracyScore, DistanceType };
