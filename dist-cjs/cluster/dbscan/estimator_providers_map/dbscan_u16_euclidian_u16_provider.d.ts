import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU16I32EuclidianU16, DBSCANU16EuclidianU16Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANU16EuclidianU16Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANU16EuclidianU16Parameters, DBSCANU16I32EuclidianU16> {
    parameters(config: IDBSCANBaseParameters): DBSCANU16EuclidianU16Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU16EuclidianU16Parameters): DBSCANU16I32EuclidianU16;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU16I32EuclidianU16;
}
export default DBSCANU16EuclidianU16Provider;
