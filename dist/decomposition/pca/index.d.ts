import { DenseMatrix, type InputType, type YType } from '../../index.js';
import { DataFrame } from '../../data_frame.js';
import type { NumberTypeRs } from '../index.js';
interface IPCABaseParameters {
    nComponents?: number;
    correlationMatrix?: boolean;
}
interface IPCAParameters extends IPCABaseParameters {
    targetType?: NumberTypeRs;
    columns?: string[];
}
interface PCASerializedData {
    config: IPCAParameters;
    data: Buffer;
}
interface HasColumns {
    columns: string[] | null;
}
declare class PCA implements HasColumns {
    static readonly className = "PCA";
    readonly name: string;
    readonly config: IPCAParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params: IPCAParameters);
    get columns(): string[] | null;
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    transform(x: InputType): DenseMatrix | DataFrame;
    serialize(): PCASerializedData;
    private _deserialize;
    static deserialize(data: PCASerializedData): PCA;
}
export { PCA, type IPCABaseParameters };
