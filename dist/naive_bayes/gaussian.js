import { GaussianNBF64BigU64, GaussianNBParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class GaussianNB {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new GaussianNBParameters();
        if (params?.priors) {
            this.parameters.withPriors(params.priors);
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigUint64Array) {
            this.estimator = GaussianNBF64BigU64.fit(matrix.asF64(), y, this.parameters);
        }
        else {
            throw new Error('Unsupported data type!');
        }
        return this;
    }
    predict(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.estimator.predict(matrix.asF64());
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let instance = new GaussianNB();
        instance.estimator = GaussianNBF64BigU64.deserialize(data);
        return instance;
    }
}
export default GaussianNB;
