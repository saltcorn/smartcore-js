import { DenseMatrix } from '../index.js';
import { DataFrame } from '../data_frame.js';
/**
 * Abstract base class for decomposition algorithms
 * Serves as a template for PCA and SVD
 */
class BaseDecomposition {
    constructor(parameters) {
        this.estimator = null;
        this.columns = null;
        this._isFitted = false;
        this.parameters = parameters;
    }
    /**
     * Check if model is fitted
     */
    get isFitted() {
        return this._isFitted;
    }
    /**
     * Converts input to DenseMatrix and tracks DataFrame columns
     * @param {InputType} x
     */
    toMatrix(x) {
        if (x instanceof DenseMatrix) {
            return x;
        }
        if (x instanceof DataFrame) {
            // Store columns for later use in transform
            if (!this._isFitted) {
                this.columns = x.columnNames;
            }
            return DenseMatrix.f64(x.getNumericColumns());
        }
        return DenseMatrix.f64(x);
    }
    /**
     * Validates input data
     * @param {InputType} x
     */
    validateInput(x) {
        if (x === null || x === undefined) {
            throw new Error('Input data cannot be null or undefined.');
        }
        if (Array.isArray(x) && x.length === 0) {
            throw new Error('Input data cannot be empty.');
        }
        if (x instanceof DataFrame && x.rowsCount === 0) {
            throw new Error('DataFrame cannot be empty.');
        }
    }
    /**
     * A template for the fit method
     * @param {InputType} x
     * @param {YType} y
     */
    fit(x, _y) {
        this.validateInput(x);
        const matrix = this.toMatrix(x);
        // Hook method provide by subclass
        this.estimator = this.fitEstimator(matrix);
        this._isFitted = true;
        return this;
    }
    /**
     * Validates that the model is fitted before operations
     * @param {string} methodName
     */
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
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
    /**
     * Converts DenseMatrix to DataFrame
     * @param {DenseMatrix} matrix
     */
    toDataFrame(matrix) {
        const rows = matrix.nrows;
        const cols = matrix.ncols;
        const matrixData = matrix.asF64();
        // Build records with component names
        const records = [];
        for (let i = 0; i < rows; i++) {
            const record = {};
            for (let j = 0; j < cols; j++) {
                record[this.getComponentColumnName(j)] = matrixData.get([i, j]);
            }
            records.push(record);
        }
        return new DataFrame(records);
    }
    /**
     * Get column names used during fit
     */
    get fittedColumns() {
        return this.columns ? [...this.columns] : null;
    }
}
export { BaseDecomposition };
