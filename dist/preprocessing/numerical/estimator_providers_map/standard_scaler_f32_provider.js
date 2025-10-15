import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { StandardScalerF32, StandardScalerParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
class StandardScalerF32Provider {
    parameters(_config) {
        const parameters = new StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = converters.toDenseMatrixF32(x);
        return StandardScalerF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return StandardScalerF32.deserialize(data);
    }
}
export default StandardScalerF32Provider;
