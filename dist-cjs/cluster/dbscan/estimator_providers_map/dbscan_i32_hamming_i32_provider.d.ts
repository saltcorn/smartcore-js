import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32HammingI32, DBSCANI32HammingI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI32HammingI32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32HammingI32Parameters, DBSCANI32I32HammingI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32HammingI32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32HammingI32Parameters): DBSCANI32I32HammingI32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32HammingI32;
}
export default DBSCANI32HammingI32Provider;
