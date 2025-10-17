import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32MinkowskiI32, DBSCANI32MinkowskiI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI32MinkowskiI32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32MinkowskiI32Parameters, DBSCANI32I32MinkowskiI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32MinkowskiI32Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI32MinkowskiI32Parameters): DBSCANI32I32MinkowskiI32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32MinkowskiI32;
}
export default DBSCANI32MinkowskiI32Provider;
