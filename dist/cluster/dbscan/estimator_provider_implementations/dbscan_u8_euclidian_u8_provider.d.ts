import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANU8I32EuclidianU8, DBSCANU8EuclidianU8Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANU8EuclidianU8Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANU8EuclidianU8Parameters, DBSCANU8I32EuclidianU8> {
    parameters(config: IDBSCANBaseParameters): DBSCANU8EuclidianU8Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANU8EuclidianU8Parameters): DBSCANU8I32EuclidianU8;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU8I32EuclidianU8;
}
export default DBSCANU8EuclidianU8Provider;
