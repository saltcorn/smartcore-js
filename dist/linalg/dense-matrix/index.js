import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js';
class DenseMatrix {
    constructor(data, columnMajor) {
        if (!(data instanceof Array)) {
            throw new Error('Expected data to be an array.');
        }
        let nrows = data.length;
        let ncols = data[0] instanceof Array ? data[0].length : 0;
        let valuesFlat = data.flat();
        if (valuesFlat.every((val) => Number.isInteger(val))) {
            this.inner = new DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor);
        }
        else {
            this.inner = new DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor);
        }
    }
}
export default DenseMatrix;
