import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANI64I32MinkowskiI64, DBSCANI64MinkowskiI64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANI64MinkowskiI64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANI64MinkowskiI64Parameters, DBSCANI64I32MinkowskiI64> {
    parameters(config: IDBSCANBaseParameters): DBSCANI64MinkowskiI64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANI64MinkowskiI64Parameters): DBSCANI64I32MinkowskiI64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI64I32MinkowskiI64;
}
export default DBSCANI64MinkowskiI64Provider;
