import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32EuclidianF64, DBSCANF64EuclidianF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF64EuclidianF64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64EuclidianF64Parameters, DBSCANF64I32EuclidianF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64EuclidianF64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF64EuclidianF64Parameters): DBSCANF64I32EuclidianF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32EuclidianF64;
}
export default DBSCANF64EuclidianF64Provider;
