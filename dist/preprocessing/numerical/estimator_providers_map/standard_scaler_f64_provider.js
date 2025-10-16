import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF64, StandardScalerF64, StandardScalerParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
class StandardScalerF64Provider {
    parameters(_config) {
        const parameters = new StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return StandardScalerF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return StandardScalerF64.deserialize(data);
    }
}
export default StandardScalerF64Provider;
