import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU64I32ManhattanU64, DBSCANU64ManhattanU64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANU64ManhattanU64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANU64ManhattanU64Parameters, DBSCANU64I32ManhattanU64> {
    parameters(config: IDBSCANBaseParameters): DBSCANU64ManhattanU64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU64ManhattanU64Parameters): DBSCANU64I32ManhattanU64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU64I32ManhattanU64;
}
export default DBSCANU64ManhattanU64Provider;
