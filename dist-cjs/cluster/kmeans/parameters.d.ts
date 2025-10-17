import { type NumberTypeRs } from '../../linalg/dense-matrix/index.js';
interface IKMeansBaseParameters {
    maxIter?: bigint | number;
    k?: bigint | number;
}
interface IKMeansParameters {
    withK(k: bigint): void;
    withMaxIter(maxIter: bigint): void;
}
declare function setKMeansParametersValues(parameters: IKMeansParameters, config: IKMeansBaseParameters): void;
export type { IKMeansBaseParameters, NumberTypeRs };
export { setKMeansParametersValues };
