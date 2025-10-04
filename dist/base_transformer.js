import { DenseMatrix } from './index.js';
import { DataFrame } from './data_frame.js';
import { BaseEstimator } from './base_estimator.js';
/**
 * Abstract base class for transformers
 */
class BaseTransformer extends BaseEstimator {
    constructor(parameters) {
        super(parameters);
    }
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    transform(x) {
        this.ensureFitted('transform');
        this.validateInput(x);
        const isDataFrame = x instanceof DataFrame;
        let matrix;
        // Handle DataFrame column selection
        if (isDataFrame && this.columns !== null) {
            matrix = DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns());
        }
        else {
            matrix = this.toMatrix(x);
        }
        // 'transformMatrix' implementation is provided by subclasses
        const transformed = this.transformMatrix(matrix);
        // Return same type as input
        return isDataFrame ? this.toDataFrame(transformed) : transformed;
    }
}
export { BaseTransformer };
