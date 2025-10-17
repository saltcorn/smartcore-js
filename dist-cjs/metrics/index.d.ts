import { type YType } from '../index.js';
declare function accuracyScore(yTrue: YType, yPred: YType): number;
type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski';
export { accuracyScore, type DistanceType };
