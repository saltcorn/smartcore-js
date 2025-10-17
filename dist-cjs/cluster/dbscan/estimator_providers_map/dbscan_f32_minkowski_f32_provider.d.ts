import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32MinkowskiF32, DBSCANF32MinkowskiF32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF32MinkowskiF32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32MinkowskiF32Parameters, DBSCANF32I32MinkowskiF32> {
    parameters(config: IDBSCANBaseParameters): DBSCANF32MinkowskiF32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF32MinkowskiF32Parameters): DBSCANF32I32MinkowskiF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF32I32MinkowskiF32;
}
export default DBSCANF32MinkowskiF32Provider;
