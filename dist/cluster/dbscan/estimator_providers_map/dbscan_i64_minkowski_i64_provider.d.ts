import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI64I32MinkowskiI64, DBSCANI64MinkowskiI64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI64MinkowskiI64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI64MinkowskiI64Parameters, DBSCANI64I32MinkowskiI64> {
    parameters(config: IDBSCANBaseParameters): DBSCANI64MinkowskiI64Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANI64MinkowskiI64Parameters): DBSCANI64I32MinkowskiI64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI64I32MinkowskiI64;
}
export default DBSCANI64MinkowskiI64Provider;
