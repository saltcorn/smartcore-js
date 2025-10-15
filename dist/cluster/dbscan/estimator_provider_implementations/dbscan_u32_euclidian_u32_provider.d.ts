import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANU32I32EuclidianU32, DBSCANU32EuclidianU32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANU32EuclidianU32Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANU32EuclidianU32Parameters, DBSCANU32I32EuclidianU32> {
    parameters(config: IDBSCANBaseParameters): DBSCANU32EuclidianU32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANU32EuclidianU32Parameters): DBSCANU32I32EuclidianU32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU32I32EuclidianU32;
}
export default DBSCANU32EuclidianU32Provider;
