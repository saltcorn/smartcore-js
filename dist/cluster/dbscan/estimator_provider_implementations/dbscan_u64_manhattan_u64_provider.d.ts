import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANU64I32ManhattanU64, DBSCANU64ManhattanU64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANU64ManhattanU64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANU64ManhattanU64Parameters, DBSCANU64I32ManhattanU64> {
    parameters(config: IDBSCANBaseParameters): DBSCANU64ManhattanU64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANU64ManhattanU64Parameters): DBSCANU64I32ManhattanU64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU64I32ManhattanU64;
}
export default DBSCANU64ManhattanU64Provider;
