import { MultinomialNBU64BigU64, MultinomialNBParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class MultinomialNB {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new MultinomialNBParameters();
        if (params?.priors) {
            this.parameters.withPriors(params.priors);
        }
        if (params?.alpha) {
            this.parameters.withAlpha(params.alpha);
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof BigUint64Array) {
            this.estimator = MultinomialNBU64BigU64.fit(matrix.asF64(), y, this.parameters);
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
        let instance = new MultinomialNB();
        instance.estimator = MultinomialNBU64BigU64.deserialize(data);
        return instance;
    }
}
export default MultinomialNB;
