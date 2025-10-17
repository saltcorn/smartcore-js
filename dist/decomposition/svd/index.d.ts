import { DenseMatrix, type InputType, type YType } from '../../index.js';
import { DataFrame } from '../../data_frame.js';
import type { NumberTypeRs } from '../index.js';
interface ISVDBaseParameters {
    nComponents?: number;
    correlationMatrix?: boolean;
}
interface ISVDParameters extends ISVDBaseParameters {
    targetType?: NumberTypeRs;
    columns?: string[];
}
interface SVDSerializedData {
    config: ISVDParameters;
    data: Buffer;
}
interface HasColumns {
    columns: string[] | null;
}
declare class SVD implements HasColumns {
    static readonly className = "SVD";
    readonly name: string;
    readonly config: ISVDParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params?: ISVDParameters);
    get columns(): string[] | null;
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    transform(x: InputType): DenseMatrix | DataFrame;
    serialize(): SVDSerializedData;
    private _deserialize;
    static deserialize(data: SVDSerializedData): SVD;
}
export { SVD, type ISVDBaseParameters };
