"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../core-bindings/index.js");
class DenseMatrix {
    inner;
    constructor(data, columnMajor) {
        if (data instanceof Array) {
            let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data);
            if (valuesFlat.every((val) => Number.isInteger(val))) {
                this.inner = new index_js_1.DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor);
            }
            else {
                this.inner = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
            }
        }
        else {
            this.inner = data;
        }
    }
    static prepData(data) {
        if (!(data instanceof Array)) {
            throw new Error('Expected data to be an array.');
        }
        let nrows = data.length;
        let ncols = data[0] instanceof Array ? data[0].length : 0;
        let valuesFlat = data.flat();
        return [nrows, ncols, valuesFlat];
    }
    get matrix() {
        return this.inner;
    }
    static f64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data);
        let matrix = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
        return new DenseMatrix(matrix, columnMajor);
    }
    static u64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data);
        let BigValuesFlat = valuesFlat.map((v) => BigInt(v));
        let matrix = new index_js_1.DenseMatrixU64(nrows, ncols, new BigUint64Array(BigValuesFlat), columnMajor);
        return new DenseMatrix(matrix, columnMajor);
    }
    asF64() {
        if (!(this.inner instanceof index_js_1.DenseMatrixF64)) {
            throw new Error('Inner type not an f64 DenseMatrix');
        }
        return this.inner;
    }
    asU64() {
        if (this.inner instanceof index_js_1.DenseMatrixU64) {
            return this.inner;
        }
        else if (this.inner instanceof index_js_1.DenseMatrixI64) {
            //s
        }
        else {
            throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixU64 not supported!`);
        }
        return this.inner;
    }
}
exports.default = DenseMatrix;
