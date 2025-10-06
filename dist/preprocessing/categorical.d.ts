import { OneHotEncoderF64, OneHotEncoderParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
type OneHotEncoderRs = OneHotEncoderF64;
type OneHotEncoderParametersRs = OneHotEncoderParameters;
interface IOneHotEncoderParameters {
    categoricalParams: BigUint64Array;
}
interface OneHotEncoderSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: IOneHotEncoderParameters;
}
declare class OneHotEncoder extends BaseTransformer<OneHotEncoderRs, OneHotEncoderParametersRs> {
    static readonly className = "OneHotEncoder";
    readonly name: string;
    constructor(params: IOneHotEncoderParameters);
    protected fitEstimator(matrix: DenseMatrix): OneHotEncoderF64;
    protected transformMatrix(matrix: DenseMatrix): DenseMatrix;
    protected getComponentColumnName(index: number): string;
    serialize(): OneHotEncoderSerializedData;
}
export default OneHotEncoder;
