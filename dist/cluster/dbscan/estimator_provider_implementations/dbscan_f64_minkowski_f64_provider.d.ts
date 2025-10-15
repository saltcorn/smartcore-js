import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANF64I32MinkowskiF64, DBSCANF64MinkowskiF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANF64MinkowskiF64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANF64MinkowskiF64Parameters, DBSCANF64I32MinkowskiF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64MinkowskiF64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF64MinkowskiF64Parameters): DBSCANF64I32MinkowskiF64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32MinkowskiF64;
}
export default DBSCANF64MinkowskiF64Provider;
