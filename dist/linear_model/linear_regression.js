import { LinearRegressionF64I64, LinearRegressionParameters, LinearRegressionF64F64, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class LinearRegression {
    constructor(inner) {
        this.inner = inner;
    }
    fit(x, y, parameters) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y.every((val) => Number.isInteger(val))) {
            this.inner = LinearRegressionF64I64.fit(matrix.asF64(), y, parameters);
        }
        else {
            this.inner = LinearRegressionF64F64.fit(matrix.asF64(), new Float64Array(y), parameters);
        }
        return this;
    }
    predict(x) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.inner.predict(matrix.asF64());
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
