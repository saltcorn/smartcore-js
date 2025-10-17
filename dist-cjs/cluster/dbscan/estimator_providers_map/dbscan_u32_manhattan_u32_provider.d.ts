import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU32I32ManhattanU32, DBSCANU32ManhattanU32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANU32ManhattanU32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANU32ManhattanU32Parameters, DBSCANU32I32ManhattanU32> {
    parameters(config: IDBSCANBaseParameters): DBSCANU32ManhattanU32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU32ManhattanU32Parameters): DBSCANU32I32ManhattanU32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU32I32ManhattanU32;
}
export default DBSCANU32ManhattanU32Provider;
