import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
class StandardScalerF32Provider {
    parameters(_config) {
        const parameters = new StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return StandardScalerF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return StandardScalerF32.deserialize(data);
    }
}
export default StandardScalerF32Provider;
