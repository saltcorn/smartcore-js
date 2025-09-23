import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class StandardScaler {
    constructor(_params) {
        this.parameters = new StandardScalerParameters();
    }
    fit(x) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new StandardScalerTransformer(new StandardScalerF64(x.asF64(), this.parameters));
    }
}
class StandardScalerTransformer {
    constructor(inner) {
        this.inner = inner;
    }
    transform(x) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return this.inner.transform(x.asF64());
    }
}
export default StandardScaler;
