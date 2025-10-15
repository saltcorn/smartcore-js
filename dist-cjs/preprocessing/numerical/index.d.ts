import { DenseMatrix, type InputType, type YType } from '../../index.js';
type NumberTypeRs = 'f32' | 'f64';
interface IStandardScalerBaseParameters {
}
interface IStandardScalerParameters extends IStandardScalerBaseParameters {
    targetType?: NumberTypeRs;
}
interface StandardScalerSerializedData {
    config: IStandardScalerParameters;
    data: Buffer;
}
declare class StandardScaler {
    static readonly className = "StandardScaler";
    readonly name: string;
    readonly config: IStandardScalerParameters;
    private _isFitted;
    private estimatorProvider;
    private parameters;
    private estimator;
    constructor(params?: IStandardScalerParameters);
    fit(x: InputType, y: YType): this;
    protected getComponentColumnName(index: number): string;
    protected ensureFitted(methodName: string): void;
    transform(matrix: InputType): DenseMatrix;
    serialize(): StandardScalerSerializedData;
    private _deserialize;
    static deserialize(data: StandardScalerSerializedData): StandardScaler;
}
export { StandardScaler, type IStandardScalerBaseParameters, type NumberTypeRs };
