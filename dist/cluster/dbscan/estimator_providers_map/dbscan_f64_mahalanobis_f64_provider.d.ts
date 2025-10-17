import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32MahalanobisF64, DBSCANF64MahalanobisF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF64MahalanobisF64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64I32MahalanobisF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64MahalanobisF64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF64MahalanobisF64Parameters): DBSCANF64I32MahalanobisF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32MahalanobisF64;
}
export default DBSCANF64MahalanobisF64Provider;
