import type { XType, YType } from '../index.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
interface SVDParams {
    nComponents?: number;
}
declare class SVD implements Estimator<XType, YType, SVD>, Transformer<XType> {
    private parameters;
    private estimator;
    constructor(params?: SVDParams);
    fit(x: XType, y: YType): SVD;
    transform(x: XType): XType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): SVD;
}
export { SVD };
