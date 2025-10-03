import { DenseMatrix, type XType, type YType } from '../index.js';
import { DataFrame } from '../data_frame.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
/**
 * Abstract base class for decomposition algorithms
 * Serves as a template for PCA and SVD
 */
declare abstract class BaseDecomposition<TEstimator, TParams> implements Estimator<XType | DataFrame, YType, any>, Transformer<XType | DataFrame> {
    protected parameters: TParams;
    protected estimator: TEstimator | null;
    protected columns: string[] | null;
    protected _isFitted: boolean;
    abstract readonly name: string;
    constructor(parameters: TParams);
    /**
     * Check if model is fitted
     */
    get isFitted(): boolean;
    /**
     * Converts input to DenseMatrix and tracks DataFrame columns
     * @param {XType | DataFrame} x
     */
    protected toMatrix(x: XType | DataFrame): DenseMatrix;
    /**
     * Validates input data
     * @param {XType | DataFrame} x
     */
    protected validateInput(x: XType | DataFrame): void;
    /**
     * A template for the fit method
     * @param {XType | DataFrame} x
     * @param {YType} y
     */
    fit(x: XType | DataFrame, _y?: YType): this;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract fitEstimator(matrix: DenseMatrix): TEstimator;
    /**
     * Validates that the model is fitted before operations
     * @param {string} methodName
     */
    protected ensureFitted(methodName: string): void;
    /**
     * A template for the transform method
     * @param {XType | DataFrame} x
     */
    transform(x: XType | DataFrame): DenseMatrix | DataFrame;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract transformMatrix(matrix: DenseMatrix): DenseMatrix;
    /**
     * Converts DenseMatrix to DataFrame
     * @param {DenseMatrix} matrix
     */
    protected toDataFrame(matrix: DenseMatrix): DataFrame;
    /**
     * Create a name for a column given its index
     * @param {number} index - The index of the column
     * @returns {string} The column name derived from the provided index
     */
    protected abstract getComponentColumnName(index: number): string;
    /**
     * Get column names used during fit
     */
    get fittedColumns(): string[] | null;
    /**
     * @returns An Object containing information that can be used to reinstantiate an identical instance to the serialized one
     */
    abstract serialize(): any;
}
export { BaseDecomposition };
