import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANI64I32EuclidianI64, DBSCANI64EuclidianI64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANI64EuclidianI64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANI64EuclidianI64Parameters, DBSCANI64I32EuclidianI64> {
    parameters(config: IDBSCANBaseParameters): DBSCANI64EuclidianI64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANI64EuclidianI64Parameters): DBSCANI64I32EuclidianI64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI64I32EuclidianI64;
}
export default DBSCANI64EuclidianI64Provider;
