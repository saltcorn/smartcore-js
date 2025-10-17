import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, SVDF32, SVDParameters } from '../../../core-bindings/index.js';
import {} from '../index.js';
import {} from '../../../estimator.js';
import { setSVDParametersValues } from './index.js';
class SVDF32Provider {
    parameters(config) {
        const parameters = new SVDParameters();
        setSVDParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return SVDF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return SVDF32.deserialize(data);
    }
}
export default SVDF32Provider;
