import { OneHotEncoderF64, OneHotEncoderParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class OneHotEncoder {
    constructor(params) {
        this.estimator = null;
        this.parameters = new OneHotEncoderParameters(params.categoricalParams);
    }
    fit(x, _y) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        this.estimator = new OneHotEncoderF64(x.asF64(), this.parameters);
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
export default OneHotEncoder;
