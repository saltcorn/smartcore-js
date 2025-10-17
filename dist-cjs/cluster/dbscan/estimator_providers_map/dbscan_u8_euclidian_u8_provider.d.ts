import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DBSCANU8I32EuclidianU8, DBSCANU8EuclidianU8Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANU8EuclidianU8Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANU8EuclidianU8Parameters, DBSCANU8I32EuclidianU8> {
    parameters(config: IDBSCANBaseParameters): DBSCANU8EuclidianU8Parameters;
    estimator(x: DenseMatrix, _y: YType, parameters: DBSCANU8EuclidianU8Parameters): DBSCANU8I32EuclidianU8;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU8I32EuclidianU8;
}
export default DBSCANU8EuclidianU8Provider;
