import { type DenseMatrixRs, type InputType, type YType } from '../../index.js';
import { DBSCANF32I32EuclidianF32, DBSCANF32EuclidianF32Parameters, type KNNAlgorithmName } from '../../core-bindings/index.js';
import { type NumberTypeRs } from '../../linalg/dense-matrix/index.js';
interface Estimator {
    predict(x: DenseMatrixRs): any;
    serialize(): Buffer;
}
interface EstimatorProvider<C, P, E extends Estimator> {
    parameters(config: C): P;
    estimator(x: InputType, y: YType, parameters: P): E;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): E;
}
interface IDBSCANBaseParameters {
    minSamples?: number;
    algorithm?: KNNAlgorithmName;
    eps?: number;
    data?: InputType;
    p?: number;
}
type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski';
declare class DBSCANF32EuclidianF32Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANF32EuclidianF32Parameters, DBSCANF32I32EuclidianF32> {
    parameters(config: IDBSCANBaseParameters): DBSCANF32EuclidianF32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF32EuclidianF32Parameters): DBSCANF32I32EuclidianF32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF32I32EuclidianF32;
}
declare const EstimatorProviders: Map<NumberTypeRs, Map<DistanceType, EstimatorProvider<IDBSCANBaseParameters, any, any>>>;
export type { Estimator, EstimatorProvider, IDBSCANBaseParameters, NumberTypeRs, DistanceType };
export { EstimatorProviders, DBSCANF32EuclidianF32Provider };
