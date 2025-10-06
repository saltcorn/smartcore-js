"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEstimator = void 0;
const index_js_1 = require("./index.js");
const data_frame_js_1 = require("./data_frame.js");
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
     */
    toMatrix(x) {
        if (x instanceof index_js_1.DenseMatrix) {
            return x;
        }
        if (x instanceof data_frame_js_1.DataFrame) {
            // Store columns for later use in transform
            if (!this._isFitted) {
                this.columns = x.columnNames;
            }
            return index_js_1.DenseMatrix.f64(x.getNumericColumns());
        }
        return index_js_1.DenseMatrix.f64(x);
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
        if (x instanceof data_frame_js_1.DataFrame && x.rowsCount === 0) {
            throw new Error(`${this.name}: DataFrame cannot be empty.`);
        }
    }
    /**
     * A template for the fit method
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
     */
    ensureFitted(methodName) {
        if (!this._isFitted || this.estimator === null) {
            throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`);
        }
    }
    /**
     * Converts DenseMatrix to DataFrame
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
        return new data_frame_js_1.DataFrame(records);
    }
    /**
     * Get column names used during fit
     */
    get fittedColumns() {
        return this.columns ? [...this.columns] : null;
    }
}
exports.BaseEstimator = BaseEstimator;
