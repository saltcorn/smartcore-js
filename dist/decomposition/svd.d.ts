import { SVDF64, SVDParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
interface SVDParams {
    nComponents?: number;
    columns?: string[];
}
interface SVDSerializedData {
    columns: string[] | null;
    data: Buffer;
    params: SVDParams;
}
type SVDRs = SVDF64;
type SVDParametersRs = SVDParameters;
declare class SVD extends BaseTransformer<SVDRs, SVDParametersRs> {
    static readonly className = "SVD";
    readonly name: string;
    private readonly config;
    constructor(params?: SVDParams);
    fitEstimator(matrix: DenseMatrix): SVDF64;
    transformMatrix(matrix: DenseMatrix): DenseMatrix;
    protected getComponentColumnName(index: number): string;
    serialize(): SVDSerializedData;
    /**
     * Creates instance from serialized data
     */
    static deserialize(serializedData: SVDSerializedData): SVD;
}
export { SVD };
