import { RandomForestClassifierF64I64, RandomForestClassifierParameters, DenseMatrixF64, } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class RandomForestClassifier {
    constructor(inner) {
        this.inner = inner;
    }
    static fit(x, y, parameters) {
        let matrix = x instanceof DenseMatrix ? x : new DenseMatrix(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (matrix.inner instanceof DenseMatrixF64) {
            if (y.every((val) => Number.isInteger(val))) {
                parameters = parameters ? parameters : new RandomForestClassifierParameters();
                return new RandomForestClassifier(RandomForestClassifierF64I64.fit(matrix.inner, y, parameters));
            }
            else {
                throw new Error('Unsupported data type for input arrays.');
            }
        }
        throw new Error('Unsupported data type for input arrays.');
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
            let inner = RandomForestClassifierF64I64.deserialize(data);
            return new RandomForestClassifier(inner);
        }
        catch (e) {
            try {
                let inner = RandomForestClassifierF64I64.deserialize(data);
                return new RandomForestClassifier(inner);
            }
            catch (e) {
                throw e;
            }
        }
    }
}
export { RandomForestClassifier, RandomForestClassifierParameters };
