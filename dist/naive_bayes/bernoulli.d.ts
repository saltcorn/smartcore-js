import { BernoulliNBF64BigU64, BernoulliNBF64Parameters } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type BernoulliNBRs = BernoulliNBF64BigU64;
type BernoulliNBParameters = BernoulliNBF64Parameters;
interface IBernoulliNBParameters {
    priors?: Float64Array;
    alpha?: number;
    binarize?: number;
}
declare class BernoulliNB implements Estimator<XType, YType, BernoulliNB>, Predictor<XType, BigUint64Array> {
    parameters: BernoulliNBParameters;
    estimator: BernoulliNBRs | null;
    constructor(params?: IBernoulliNBParameters);
    fit(x: XType, y: YType): BernoulliNB;
    predict(x: XType): BigUint64Array;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): BernoulliNB;
}
export default BernoulliNB;
