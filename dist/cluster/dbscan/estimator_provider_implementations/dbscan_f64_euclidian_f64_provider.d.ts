import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANF64I32EuclidianF64, DBSCANF64EuclidianF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANF64EuclidianF64Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANF64EuclidianF64Parameters, DBSCANF64I32EuclidianF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64EuclidianF64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF64EuclidianF64Parameters): DBSCANF64I32EuclidianF64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32EuclidianF64;
}
export default DBSCANF64EuclidianF64Provider;
