import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANI32I32MinkowskiI32, DBSCANI32MinkowskiI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANI32MinkowskiI32Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANI32MinkowskiI32Parameters, DBSCANI32I32MinkowskiI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32MinkowskiI32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANI32MinkowskiI32Parameters): DBSCANI32I32MinkowskiI32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32MinkowskiI32;
}
export default DBSCANI32MinkowskiI32Provider;
