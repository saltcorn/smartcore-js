import { type XType, type YType } from '../index.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
interface PCAParams {
    nComponents?: number;
    correlationMatrix?: boolean;
}
interface ISerializedData {
    columns: string[] | null;
    data: Buffer;
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
    static deserialize(serializedData: ISerializedData): PCA;
}
export { PCA };
