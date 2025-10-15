import { type InputType } from '../../index.js';
import { type KNNAlgorithmName } from '../../core-bindings/index.js';
import { type NumberTypeRs } from '../../linalg/dense-matrix/index.js';
interface IDBSCANBaseParameters {
    minSamples?: number;
    algorithm?: KNNAlgorithmName;
    eps?: number;
    data?: InputType;
    p?: number;
}
interface IDBSCANParameters {
    withMinSamples(samples: number): void;
    withAlgorithm(algorithm: KNNAlgorithmName): void;
    withEps(eps: number): void;
}
declare function setDBSCANParametersValues(parameters: IDBSCANParameters, config: IDBSCANBaseParameters): void;
export type { IDBSCANBaseParameters, NumberTypeRs };
export { setDBSCANParametersValues };
