import { PCAParameters, PCAF64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class PCATransformer {
    constructor(inner) {
        this.inner = inner;
    }
    transform(x) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new DenseMatrix(this.inner.transform(x.asF64()));
    }
    serialize() {
        return this.inner.serialize();
    }
    deserialize(data) {
        return new PCATransformer(PCAF64.deserialize(data));
    }
}
class PCA {
    constructor(params) {
        let parameters = new PCAParameters();
        if (params.nComponents !== undefined) {
            parameters.withNComponents(params.nComponents);
        }
        if (params.useCorrelationMatrix !== undefined) {
            parameters.useCorrelationMatrix = params.useCorrelationMatrix;
        }
        this.parameters = parameters;
    }
    fit(x, _y) {
        x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
        return new PCATransformer(new PCAF64(x.asF64(), this.parameters));
    }
}
export default PCA;
