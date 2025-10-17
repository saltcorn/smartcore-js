import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32EuclidianF32, DBSCANF32EuclidianF32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF32EuclidianF32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32EuclidianF32Parameters, DBSCANF32I32EuclidianF32> {
    parameters(config: IDBSCANBaseParameters): DBSCANF32EuclidianF32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF32EuclidianF32Parameters): DBSCANF32I32EuclidianF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF32I32EuclidianF32;
}
export default DBSCANF32EuclidianF32Provider;
