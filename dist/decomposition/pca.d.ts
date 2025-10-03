import { PCAF64, PCAParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import { BaseDecomposition } from './base.js';
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
declare class PCA extends BaseDecomposition<PCARs, PCAParametersRs> {
    static readonly className = "PCA";
    readonly name: string;
    private readonly config;
    constructor(params?: PCAParams);
    protected fitEstimator(matrix: DenseMatrix): PCAF64;
    protected transformMatrix(matrix: DenseMatrix): DenseMatrix;
    /**
     * Create a name for a column given its index
     * @param {number} index - The index of the column
     * @returns {string} The column name derived from the provided index
     */
    protected getComponentColumnName(index: number): string;
    /**
     * @returns An Object containing information that can be used to reinstantiate an identical PCA instance
     */
    serialize(): PCASerializedData;
    /**
     * Creates instance from serialized data
     * @param {PCASerializedData} serializedData
     * @returns {PCA} A PCA instance
     */
    static deserialize(serializedData: PCASerializedData): PCA;
}
export { PCA };
