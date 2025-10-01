import type { XType, YType } from '../index.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
interface PCAParams {
    nComponents?: number;
    correlationMatrix?: boolean;
}
declare class PCA implements Estimator<XType, YType, PCA>, Transformer<XType> {
    private parameters;
    private estimator;
    static readonly className = "PCA";
    readonly name: string;
    constructor(params?: PCAParams);
    fit(x: XType, y: YType): PCA;
    transform(x: XType): XType;
    serialize(): Buffer<ArrayBufferLike> | undefined;
    static deserialize(data: Buffer): PCA;
}
export { PCA };
