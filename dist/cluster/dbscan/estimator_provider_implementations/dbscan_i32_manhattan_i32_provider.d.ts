import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANI32I32ManhattanI32, DBSCANI32ManhattanI32Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANI32ManhattanI32Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANI32ManhattanI32Parameters, DBSCANI32I32ManhattanI32> {
    parameters(config: IDBSCANBaseParameters): DBSCANI32ManhattanI32Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANI32ManhattanI32Parameters): DBSCANI32I32ManhattanI32;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANI32I32ManhattanI32;
}
export default DBSCANI32ManhattanI32Provider;
