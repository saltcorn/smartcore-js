"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenseMatrix = void 0;
const index_js_1 = require("../../core-bindings/index.js");
class DenseMatrix {
    constructor(data, columnMajor) {
        if (data instanceof Array) {
            let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
            if (valuesFlat.every((val) => Number.isInteger(val))) {
                this.inner = new index_js_1.DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor);
            }
            else {
                this.inner = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
            }
            this._ncols = ncols;
            this._nrows = nrows;
        }
        else {
            this.inner = data;
            let [nrows, ncols] = this.inner.shape();
            this._ncols = ncols;
            this._nrows = nrows;
        }
    }
    get ncols() {
        return this._ncols;
    }
    get nrows() {
        return this._nrows;
    }
    static prepData(data, columnMajor) {
        if (!(data instanceof Array)) {
            throw new Error('Expected data to be an array.');
        }
        let nrows = columnMajor ? (data[0] instanceof Array ? data[0].length : 0) : data.length;
        let ncols = columnMajor ? data.length : data[0] instanceof Array ? data[0].length : 0;
        let valuesFlat = data.flat();
        return [nrows, ncols, valuesFlat];
    }
    get matrix() {
        return this.inner;
    }
    static f64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let matrix = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
        return new DenseMatrix(matrix, columnMajor);
    }
    static u64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let BigValuesFlat = valuesFlat.map((v) => BigInt(v));
        let matrix = new index_js_1.DenseMatrixU64(nrows, ncols, new BigUint64Array(BigValuesFlat), columnMajor);
        return new DenseMatrix(matrix, columnMajor);
    }
    asF64() {
        if (!(this.inner instanceof index_js_1.DenseMatrixF64)) {
            throw new Error('Inner type not an f64 DenseMatrix.');
        }
        return this.inner;
    }
    asU64() {
        if (this.inner instanceof index_js_1.DenseMatrixU64) {
            return this.inner;
        }
        else if (this.inner instanceof index_js_1.DenseMatrixI64) {
            // Convert inner into DenseMatrixU64 only if all values are positive
            if (this.inner.satisfies((x) => x > 0)) {
                const values = this.inner.values().map((v) => BigInt(v));
                return new index_js_1.DenseMatrixU64(this._nrows, this._ncols, new BigUint64Array(values));
            }
            else {
                throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixU64 failed. Negative numbers found.`);
            }
        }
        else {
            throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixU64 not supported.`);
        }
    }
    asI64() {
        if (this.inner instanceof index_js_1.DenseMatrixI64) {
            return this.inner;
        }
        else if (this.inner instanceof index_js_1.DenseMatrixU64) {
            if (this.inner.satisfies((x) => x <= BigInt(Number.MAX_SAFE_INTEGER) && x >= BigInt(Number.MIN_SAFE_INTEGER))) {
                const bigintValues = this.inner.values();
                const values = [...bigintValues].map((v) => Number(v));
                return new index_js_1.DenseMatrixI64(this._nrows, this._ncols, values);
            }
            else {
                throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixI64 failed. Maximum safe integer exceeded.`);
            }
        }
        else {
            throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixI64 not supported.`);
        }
    }
}
exports.DenseMatrix = DenseMatrix;
