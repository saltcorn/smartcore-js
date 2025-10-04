import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
type StandardScalerRs = StandardScalerF64;
type StandardScalerParametersRs = StandardScalerParameters;
interface IStandardScalerParameters {
}
interface StandardScalerSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IStandardScalerParameters;
}
declare class StandardScaler extends BaseTransformer<StandardScalerRs, StandardScalerParametersRs> {
    static readonly className = "StandardScaler";
    readonly name: string;
    private readonly config;
    constructor(params?: IStandardScalerParameters);
    protected fitEstimator(matrix: DenseMatrix): StandardScalerF64;
    protected transformMatrix(matrix: DenseMatrix): DenseMatrix;
    protected getComponentColumnName(index: number): string;
    serialize(): StandardScalerSerializedData;
    static deserialize(serializedData: StandardScalerSerializedData): StandardScaler;
}
export default StandardScaler;
