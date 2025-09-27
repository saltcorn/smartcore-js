import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../../core-bindings/index.js';
import type { XType, YType } from '../index.js';
import type { Estimator, Predictor } from '../pipeline/index.js';
type MultinomialNBRs = MultinomialNBU64BigU64;
type MultinomialNBParametersRs = MultinomialNBParameters;
interface IMultinomialNBParameters {
    priors?: Float64Array;
    alpha?: number;
}
declare class MultinomialNB implements Estimator<XType, YType, MultinomialNB>, Predictor<XType, BigUint64Array> {
    parameters: MultinomialNBParametersRs;
    estimator: MultinomialNBRs | null;
    constructor(params?: IMultinomialNBParameters);
    fit(x: XType, y: YType): MultinomialNB;
    predict(x: XType): BigUint64Array;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): MultinomialNB;
}
export default MultinomialNB;
