import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32MinkowskiF64, DBSCANF64MinkowskiF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF64MinkowskiF64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64MinkowskiF64Parameters, DBSCANF64I32MinkowskiF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64MinkowskiF64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF64MinkowskiF64Parameters): DBSCANF64I32MinkowskiF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32MinkowskiF64;
}
export default DBSCANF64MinkowskiF64Provider;
