import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANF64I32MahalanobisF64, DBSCANF64MahalanobisF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANF64MahalanobisF64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64I32MahalanobisF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64MahalanobisF64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF64MahalanobisF64Parameters): DBSCANF64I32MahalanobisF64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32MahalanobisF64;
}
export default DBSCANF64MahalanobisF64Provider;
