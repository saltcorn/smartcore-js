import { DenseMatrix } from './index.js';
import { DataFrame } from './data_frame.js';
/**
 * Abstract base class for estimators
 */
class BaseEstimator {
    constructor(parameters) {
        this.estimator = null;
        this.columns = null;
        this._isFitted = false;
        this._yType = null;
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
            throw new Error(`${this.name}: Input data cannot be null or undefined.`);
        }
        if (Array.isArray(x) && x.length === 0) {
            throw new Error(`${this.name}: Input data cannot be empty.`);
        }
        if (x instanceof DataFrame && x.rowsCount === 0) {
            throw new Error(`${this.name}: DataFrame cannot be empty.`);
        }
    }
    /**
     * A template for the fit method
     * @param {InputType} x
     * @param {YType} y
     */
    fit(x, y) {
        this.validateInput(x);
        const matrix = this.toMatrix(x);
        this.setYType(y);
        this.estimator = this.fitEstimator(matrix, y);
        this._isFitted = true;
        return this;
    }
    /**
     * Records the type of y. Useful when determining the output of methods such as predict
     */
    setYType(y) {
        if (y instanceof Float64Array) {
            this._yType = 'f64';
        }
        else if (y instanceof BigInt64Array) {
            this._yType = 'bigI64';
        }
        else if (y instanceof BigUint64Array) {
            this._yType = 'bigU64';
        }
        else if (Array.isArray(y)) {
            this._yType = 'i64';
        }
        else {
            throw new Error(`${this.name}: unexpected type of y '${typeof y}'`);
        }
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
export { BaseEstimator };
