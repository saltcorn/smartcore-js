import { PCAF64, PCAParameters } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseTransformer } from '../base_transformer.js';
interface PCAParams {
    nComponents?: number;
    correlationMatrix?: boolean;
}
interface PCASerializedData {
    columns: string[] | null;
    data: Buffer;
    params: PCAParams;
}
type PCARs = PCAF64;
type PCAParametersRs = PCAParameters;
declare class PCA extends BaseTransformer<PCARs, PCAParametersRs> {
    static readonly className = "PCA";
    readonly name: string;
    private readonly config;
    constructor(params?: PCAParams);
    protected fitEstimator(matrix: DenseMatrix): PCAF64;
    protected transformMatrix(matrix: DenseMatrix): DenseMatrix;
    protected getComponentColumnName(index: number): string;
    serialize(): PCASerializedData;
    /**
     * Creates instance from serialized data
     */
    static deserialize(serializedData: PCASerializedData): PCA;
}
export { PCA };
