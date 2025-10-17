import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, PCAF32, PCAParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setPCAParametersValues } from './index.js';
class PCAF32Provider {
    parameters(config) {
        const parameters = new PCAParameters();
        setPCAParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return PCAF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return PCAF32.deserialize(data);
    }
}
export default PCAF32Provider;
