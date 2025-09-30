import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, DenseMatrixF64, } from '../../../core-bindings/index.js';
import { DenseMatrix } from '../../linalg/index.js';
class LinearRegression {
    constructor(inner) {
        this.inner = inner;
    }
    fit(x, y, parameters) {
        let matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (matrix.inner instanceof DenseMatrixF64) {
            if (y.every((val) => Number.isInteger(val))) {
                this.inner = LinearRegressionF64I64.fit(matrix.inner, y, parameters);
            }
            else {
                this.inner = LinearRegressionF64F64.fit(matrix.inner, new Float64Array(y), parameters);
            }
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    predict(x) {
        let matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x);
        if (matrix.inner instanceof DenseMatrixF64) {
            this.inner.predict(matrix.inner);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    serialize() {
        return this.inner?.serialize();
    }
    static deserialize(data) {
        try {
            let inner = LinearRegressionF64I64.deserialize(data);
            return new LinearRegression(inner);
        }
        catch (e) {
            try {
                let inner = LinearRegressionF64F64.deserialize(data);
                return new LinearRegression(inner);
            }
            catch (e) {
                throw e;
            }
        }
    }
}
export default LinearRegression;
