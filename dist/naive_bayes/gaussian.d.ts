import { GaussianNBF64BigU64, GaussianNBParameters } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type GaussianNBRs = GaussianNBF64BigU64;
type GaussianNBParametersRs = GaussianNBParameters;
interface IGaussianNBParameters {
    priors?: Float64Array;
}
declare class GaussianNB implements Estimator<XType, YType, GaussianNB>, Predictor<XType, BigUint64Array> {
    parameters: GaussianNBParametersRs;
    estimator: GaussianNBRs | null;
    constructor(params?: IGaussianNBParameters);
    fit(x: XType, y: YType): GaussianNB;
    predict(x: XType): BigUint64Array;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): GaussianNB;
}
export default GaussianNB;
