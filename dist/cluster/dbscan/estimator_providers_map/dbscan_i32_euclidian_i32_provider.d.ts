import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANI32I32EuclidianI32, DBSCANI32EuclidianI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANI32EuclidianI32Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANI32EuclidianI32Parameters, DBSCANI32I32EuclidianI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32EuclidianI32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANI32EuclidianI32Parameters): DBSCANI32I32EuclidianI32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32EuclidianI32;
}
export default DBSCANI32EuclidianI32Provider;
