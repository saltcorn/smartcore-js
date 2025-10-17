import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32ManhattanF32, DBSCANF32ManhattanF32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF32ManhattanF32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF32ManhattanF32Parameters, DBSCANF32I32ManhattanF32> {
    parameters(config: IDBSCANBaseParameters): DBSCANF32ManhattanF32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANF32ManhattanF32Parameters): DBSCANF32I32ManhattanF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF32I32ManhattanF32;
}
export default DBSCANF32ManhattanF32Provider;
