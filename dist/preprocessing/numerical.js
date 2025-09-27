import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class StandardScaler {
    parameters;
    estimator = null;
    constructor(_params) {
        this.parameters = new StandardScalerParameters();
    }
    fit(x, _y) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        this.estimator = new StandardScalerF64(x.asF64(), this.parameters);
        return this;
    }
    transform(x) {
        if (this.estimator === null) {
            throw new Error("The 'fit' method should called before the 'transform' method is called.");
        }
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new DenseMatrix(this.estimator.transform(x.asF64()));
    }
}
export default StandardScaler;
