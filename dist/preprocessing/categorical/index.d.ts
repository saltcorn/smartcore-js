import { DenseMatrix, type InputType, type YType } from '../../index.js';
type NumberTypeRs = 'f32' | 'f64';
interface IOneHotEncoderBaseParameters {
    categoricalParams: number[] | bigint[] | BigUint64Array;
}
interface IOneHotEncoderParameters extends IOneHotEncoderBaseParameters {
    targetType?: NumberTypeRs;
}
interface OneHotEncoderSerializedData {
    config: IOneHotEncoderParameters;
    data: Buffer;
}
declare class OneHotEncoder {
    static readonly className = "OneHotEncoder";
    readonly name: string;
    readonly config: IOneHotEncoderParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params: IOneHotEncoderParameters);
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    transform(matrix: InputType): DenseMatrix;
    serialize(): OneHotEncoderSerializedData;
    private _deserialize;
    static deserialize(data: OneHotEncoderSerializedData): OneHotEncoder;
}
export { OneHotEncoder, type IOneHotEncoderBaseParameters, type NumberTypeRs };
