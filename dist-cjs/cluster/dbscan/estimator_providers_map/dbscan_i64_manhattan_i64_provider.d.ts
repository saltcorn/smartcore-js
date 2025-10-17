import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32ManhattanI64, DBSCANI64ManhattanI64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI64ManhattanI64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64ManhattanI64Parameters, DBSCANI64I32ManhattanI64> {
    parameters(config: IDBSCANBaseParameters): DBSCANI64ManhattanI64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI64ManhattanI64Parameters): DBSCANI64I32ManhattanI64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI64I32ManhattanI64;
}
export default DBSCANI64ManhattanI64Provider;
