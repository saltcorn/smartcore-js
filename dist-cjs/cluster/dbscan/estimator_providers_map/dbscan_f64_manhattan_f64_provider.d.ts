import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANF64I32ManhattanF64, DBSCANF64ManhattanF64Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class DBSCANF64ManhattanF64Provider implements PredictorProvider<IDBSCANBaseParameters, DBSCANF64ManhattanF64Parameters, DBSCANF64I32ManhattanF64> {
    parameters(config: IDBSCANBaseParameters): DBSCANF64ManhattanF64Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANF64ManhattanF64Parameters): DBSCANF64I32ManhattanF64;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANF64I32ManhattanF64;
}
export default DBSCANF64ManhattanF64Provider;
