import { type DenseMatrixRs, type InputType, type YType } from '../../../index.js';
import { DBSCANU16EuclidianU16Parameters, DBSCANU16I32HammingU16, DBSCANU16HammingU16Parameters } from '../../../core-bindings/index.js';
import { type IDBSCANBaseParameters } from '../parameters.js';
import { type EstimatorProvider } from '../../../estimator.js';
declare class DBSCANU16HammingU16Provider implements EstimatorProvider<IDBSCANBaseParameters, DBSCANU16HammingU16Parameters, DBSCANU16I32HammingU16> {
    parameters(config: IDBSCANBaseParameters): DBSCANU16HammingU16Parameters;
    estimator(x: InputType, _y: YType, parameters: DBSCANU16EuclidianU16Parameters): DBSCANU16I32HammingU16;
    toMatrix(x: InputType): DenseMatrixRs;
    deserialize(data: Buffer): DBSCANU16I32HammingU16;
}
export default DBSCANU16HammingU16Provider;
