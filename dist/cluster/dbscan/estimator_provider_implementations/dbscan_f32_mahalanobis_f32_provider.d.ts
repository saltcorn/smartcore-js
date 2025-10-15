import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANF32I32MahalanobisF32, DBSCANF32MahalanobisF32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANF32MahalanobisF32Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANF32MahalanobisF32Parameters, DBSCANF32I32MahalanobisF32> {
    parameters(config: IDBSCANBaseParameters): DBSCANF32MahalanobisF32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF32MahalanobisF32Parameters): DBSCANF32I32MahalanobisF32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF32I32MahalanobisF32;
}
export default DBSCANF32MahalanobisF32Provider;
