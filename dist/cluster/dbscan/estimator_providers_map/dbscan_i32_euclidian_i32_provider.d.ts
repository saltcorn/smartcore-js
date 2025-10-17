import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32EuclidianI32, DBSCANI32EuclidianI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI32EuclidianI32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32EuclidianI32Parameters, DBSCANI32I32EuclidianI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32EuclidianI32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32EuclidianI32Parameters): DBSCANI32I32EuclidianI32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32EuclidianI32;
}
export default DBSCANI32EuclidianI32Provider;
