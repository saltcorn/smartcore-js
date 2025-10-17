import { DenseMatrix } from './index.js';
import { DataFrame } from './data_frame.js';
/**
 * Abstract base class for estimators
 */
class BaseEstimator {
    constructor(parameters, selectedColumns) {
        this.estimator = null;
        this.columns = null;
        this._isFitted = false;
        this._yType = null;
        this.parameters = parameters;
        this.columns = selectedColumns ?? null;
    }
    /**
     * Check if model is fitted
     */
    get isFitted() {
        return this._isFitted;
    }
    /**
     * Converts input to DenseMatrix and tracks DataFrame columns
     */
    toMatrix(x) {
        if (x instanceof DenseMatrix) {
            return x;
        }
        if (x instanceof DataFrame) {
            // Store columns for later use in transform
            if (!this._isFitted) {
                if (Array.isArray(this.columns) && this.columns.length > 0) {
                    this.columns = x.columnNames.filter((n) => this.columns?.includes(n));
                }
                else {
                    this.columns = x.columnNames;
                }
            }
            return new DenseMatrix(x.getNumericColumns(), { columnMajor: true });
        }
        return new DenseMatrix(x);
    }
    /**
     * Validates input data
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
     * @returns data containing values from only the selected columns
     */
    getMatrixWindow(x) {
        const isDataFrame = x instanceof DataFrame;
        // Handle selective column transformation
        if (isDataFrame && this.columns !== null) {
            return x.selectColumnsByName(this.columns);
        }
        return x;
    }
    /**
     * A template for the fit method
     */
    fit(x, y) {
        this.validateInput(x);
        const matrix = this.toMatrix(this.getMatrixWindow(x));
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
     */
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    /**
     * Get column names used during fit
     */
    get fittedColumns() {
        return this.columns ? [...this.columns] : null;
    }
}
export { BaseEstimator };
