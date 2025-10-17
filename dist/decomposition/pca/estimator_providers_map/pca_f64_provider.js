import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF64, PCAF64, PCAParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setPCAParametersValues } from './index.js';
class PCAF64Provider {
    parameters(config) {
        const parameters = new PCAParameters();
        setPCAParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = x.asRsMatrix('f64');
        return PCAF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f64');
    }
    deserialize(data) {
        return PCAF64.deserialize(data);
    }
}
export default PCAF64Provider;
