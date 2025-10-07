import { DenseMatrix } from './index.js';
import { DataFrame } from './data_frame.js';
import { BaseEstimator } from './base_estimator.js';
/**
 * Abstract base class for predictors
 */
class BasePredictor extends BaseEstimator {
    constructor(parameters) {
        super(parameters);
    }
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    predict(x) {
        this.ensureFitted('transform');
        this.validateInput(x);
        if (x instanceof DenseMatrix)
            console.log(`[${this.name}].predict (x: ${x.nrows}, y: ${x.ncols})`);
        if (x instanceof DataFrame)
            console.log(`[${this.name}].predict (x: ${x.rowsCount}, y: ${x.columnsCount}) `);
        const isDataFrame = x instanceof DataFrame;
        let matrix;
        // Handle DataFrame column selection
        if (isDataFrame && this.columns !== null) {
            matrix = DenseMatrix.f64(x.selectColumnsByName(this.columns).getNumericColumns(), true);
        }
        else {
            matrix = this.toMatrix(x);
        }
        // 'predictMatrix' implementation is provided by subclasses
        return this.predictMatrix(matrix);
    }
}
export { BasePredictor };
