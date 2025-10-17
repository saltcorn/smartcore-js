import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32ManhattanI32, DBSCANI32ManhattanI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI32ManhattanI32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32ManhattanI32Parameters, DBSCANI32I32ManhattanI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32ManhattanI32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32ManhattanI32Parameters): DBSCANI32I32ManhattanI32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32ManhattanI32;
}
export default DBSCANI32ManhattanI32Provider;
