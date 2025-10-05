import { DenseMatrix, type InputType } from './index.js';
import { DataFrame } from './data_frame.js';
import type { Transformer } from './pipeline/index.js';
import { BaseEstimator } from './base_estimator.js';
/**
 * Abstract base class for transformers
 */
declare abstract class BaseTransformer<TEstimator, TParams> extends BaseEstimator<TEstimator, TParams> implements Transformer<InputType> {
    constructor(parameters: TParams);
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    transform(x: InputType): DenseMatrix | DataFrame;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract transformMatrix(matrix: DenseMatrix): DenseMatrix;
}
export { BaseTransformer };
