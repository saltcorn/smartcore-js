import { DenseMatrix, type InputType } from './index.js';
import { DataFrame } from './data_frame.js';
import type { Transformer } from './pipeline/index.js';
import { BaseEstimator } from './base_estimator.js';
/**
 * Abstract base class for transformers
 */
declare abstract class BaseTransformer<TEstimator, TParams> extends BaseEstimator<TEstimator, TParams> implements Transformer<InputType> {
    constructor(parameters: TParams, selectedColumns?: string[]);
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    transform(x: InputType): DenseMatrix | DataFrame;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract transformMatrix(matrix: DenseMatrix): DenseMatrix;
    /**
     * Gets columns that were not selected for transformation
     */
    protected getRemainingColumns(x: DataFrame, selectedColumns: string[]): DataFrame | null;
    /**
     * Combines transformed columns with remaining untransformed columns
     */
    protected combineResults(transformed: DenseMatrix | DataFrame, remaining: DataFrame | null): DataFrame;
}
export { BaseTransformer };
