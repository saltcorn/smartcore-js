import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANU64I32EuclidianU64, DBSCANU64EuclidianU64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANU64EuclidianU64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANU64EuclidianU64Parameters, DBSCANU64I32EuclidianU64> {
    parameters(config: IDBSCANBaseParameters): DBSCANU64EuclidianU64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANU64EuclidianU64Parameters): DBSCANU64I32EuclidianU64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU64I32EuclidianU64;
}
export default DBSCANU64EuclidianU64Provider;
