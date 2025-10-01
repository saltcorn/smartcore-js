import { CategoricalNBBigU64, CategoricalNBParameters } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type CategoricalNBRs = CategoricalNBBigU64;
type CategoricalNBParametersRs = CategoricalNBParameters;
interface ICategoricalNBParameters {
    alpha?: number;
}
declare class CategoricalNB implements Estimator<XType, YType, CategoricalNB>, Predictor<XType, BigUint64Array> {
    parameters: CategoricalNBParametersRs;
    estimator: CategoricalNBRs | null;
    static readonly className = "CategoricalNB";
    readonly name: string;
    constructor(params?: ICategoricalNBParameters);
    fit(x: XType, y: YType): CategoricalNB;
    predict(x: XType): BigUint64Array;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): CategoricalNB;
}
export default CategoricalNB;
