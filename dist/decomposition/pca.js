import { PCAF64, PCAParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class PCA {
    parameters;
    estimator = null;
    constructor(params) {
        this.parameters = new PCAParameters();
        if (params) {
            if (params.nComponents !== undefined) {
                this.parameters.withNComponents(params.nComponents);
            }
            if (params.correlationMatrix !== undefined) {
                this.parameters.useCorrelationMatrix(params.correlationMatrix);
            }
        }
    }
    fit(x, y) {
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        if (!y || y.length === 0) {
            throw new Error('Input arrays cannot be empty.');
        }
        if (y instanceof Float64Array) {
            this.estimator = PCAF64.fit(matrix.asF64(), this.parameters);
        }
        else {
            throw new Error('Unsupported data type for input arrays.');
        }
        return this;
    }
    transform(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'predict' method is called.");
        }
        let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new DenseMatrix(this.estimator.transform(matrix.asF64()));
    }
    serialize() {
        return this.estimator?.serialize();
    }
    static deserialize(data) {
        let estimator = PCAF64.deserialize(data);
        let instance = new PCA();
        instance.estimator = estimator;
        return instance;
    }
}
export { PCA };
