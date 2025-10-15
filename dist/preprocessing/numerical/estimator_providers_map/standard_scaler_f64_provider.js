import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { StandardScalerF64, StandardScalerParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
class StandardScalerF64Provider {
    parameters(_config) {
        const parameters = new StandardScalerParameters();
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = converters.toDenseMatrixF64(x);
        return StandardScalerF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return StandardScalerF64.deserialize(data);
    }
}
export default StandardScalerF64Provider;
